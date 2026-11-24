const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadDefinition(file, ext) {
    let definition;
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js', file), 'utf8'), {
        Ext: { ...ext, define: (_, value) => { definition = value; } },
        console
    });
    return definition;
}

function fixture(toolkit, activeId, automaticSwitch = false, deferRoute = false, activeRoute) {
    const redirects = [];
    const routeExecutions = [];
    let token = activeRoute ?? (activeId === 'dashboard_home' ? '' : `route/${activeId}`);
    let lastToken = token;
    let beforeRoutes;
    function runRoute(link) {
        const listener = beforeRoutes;
        beforeRoutes = null;
        if ((!listener || listener(null, link.split('|')) !== false) && link !== lastToken) {
            routeExecutions.push(link);
            lastToken = link;
        }
    }
    const app = {
        redirectTo: (link, options) => {
            redirects.push(link);
            if (options && options.force) lastToken = null;
            if (token !== link) {
                token = link;
                if (!deferRoute) runRoute(link);
            }
        },
        updateWindowTitle() {}
    };
    const ext = {
        getApplication: () => app,
        util: { History: { getToken: () => token } },
        route: { Router: { getMultipleToken: () => '|' } },
        on: (event, listener) => {
            assert.equal(event, 'beforeroutes');
            beforeRoutes = listener;
        }
    };
    const panelDefinition = loadDefinition(`${toolkit}/view/dashboard/Panel.js`, ext);
    const controllerDefinition = loadDefinition('both/view/dashboard/Controller.js', ext);
    const components = Object.fromEntries(['dashboard_home', 'first', 'second'].map(id => [
        id, { getItemId: () => id }
    ]));
    const records = ['dashboard_home', 'first', 'second'].map(id => {
        const values = { itemId: id, link: id === 'dashboard_home' ? '' : `route/${id}`, active: id === activeId };
        return { get: key => values[key], set: (key, value) => { values[key] = value; } };
    });
    const store = {
        findExact: (key, value) => records.findIndex(record => record.get(key) === value),
        getAt: index => records[index],
        removeAt: index => records.splice(index, 1),
        each: fn => records.forEach(fn)
    };
    let active = components[activeId];
    let panel;
    const stage = {
        getComponent: id => components[id],
        getActiveItem: () => active,
        getLayout: () => ({ getActiveItem: () => active }),
        setActiveItem: component => { active = component; },
        remove: component => {
            delete components[component.getItemId()];
            if (automaticSwitch && active === component) {
                active = components.dashboard_home;
                panel.syncActiveBreadcrumb();
            }
            panel.onStageViewRemoved(stage, component);
        }
    };
    const controller = { ...controllerDefinition, getView: () => panel };
    panel = {
        ...panelDefinition,
        getComponent: () => stage,
        getBreadcrumbStore: () => store,
        getController: () => controller,
        mun() {}
    };
    return { panel, stage, components, records, redirects, routeExecutions, app, runRoute, active: () => active };
}

for (const toolkit of ['classic', 'modern']) {
    test(`${toolkit}: closing the active breadcrumb navigates to its left neighbour`, () => {
        for (const automaticSwitch of [false, true]) {
            const f = fixture(toolkit, 'second', automaticSwitch);
            f.panel.closeView('second');
            assert.equal(f.active().getItemId(), 'first');
            assert.deepEqual(f.redirects, ['route/first']);
            assert.deepEqual(f.routeExecutions, []);
            assert.deepEqual(f.records.map(record => record.get('itemId')), ['dashboard_home', 'first']);
            f.app.redirectTo('route/other');
            assert.deepEqual(f.routeExecutions, ['route/other']);
        }
    });

    test(`${toolkit}: closing the first breadcrumb navigates home`, () => {
        const f = fixture(toolkit, 'first', true);
        f.panel.closeView('first');
        assert.equal(f.active().getItemId(), 'dashboard_home');
        assert.deepEqual(f.redirects, ['']);
        assert.deepEqual(f.routeExecutions, []);
    });

    test(`${toolkit}: a closed route can be opened again`, () => {
        const jobRoute = 'job2report/receipt/angebot/13170';
        const f = fixture(toolkit, 'second', true, false, jobRoute);
        f.panel.closeView('second');
        f.app.redirectTo(jobRoute);
        assert.deepEqual(f.routeExecutions, [jobRoute]);
    });

    test(`${toolkit}: closing an inactive breadcrumb leaves the route unchanged`, () => {
        const f = fixture(toolkit, 'second');
        f.panel.closeView('first');
        assert.equal(f.active().getItemId(), 'second');
        assert.deepEqual(f.redirects, []);
    });

    test(`${toolkit}: a subsequent different route is not suppressed`, () => {
        const f = fixture(toolkit, 'second', true, true);
        f.panel.closeView('second');
        f.app.redirectTo('route/other');
        f.runRoute('route/other');
        assert.deepEqual(f.routeExecutions, ['route/other']);
    });

    test(`${toolkit}: an unchanged route does not suppress later navigation`, () => {
        const f = fixture(toolkit, 'second');
        f.records[1].set('link', 'route/second');
        f.panel.closeView('second');
        f.app.redirectTo('route/other');
        assert.deepEqual(f.routeExecutions, ['route/other']);
    });

    test(`${toolkit}: the home breadcrumb cannot be closed`, () => {
        const f = fixture(toolkit, 'dashboard_home');
        f.panel.closeView('dashboard_home');
        assert.equal(f.active().getItemId(), 'dashboard_home');
        assert.equal(f.records.length, 3);
        assert.deepEqual(f.redirects, []);
    });
}

test('classic: a refused removal does not affect a later external removal', () => {
    const f = fixture('classic', 'second');
    const remove = f.stage.remove;
    f.stage.remove = () => {};
    f.panel.closeView('second');
    f.stage.remove = remove;
    f.stage.remove(f.components.second);
    assert.deepEqual(f.redirects, []);
});
