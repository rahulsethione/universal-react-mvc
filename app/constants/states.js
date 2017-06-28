module.exports = {
    home: {
        name: 'home',
        path: '',
        action: 'HOME',
        group: 'containers',
        class: 'Home',
        children: {
            login: {
                name: 'login',
                path: '/login',
                action: 'LOGIN',
                group: 'containers',
                class: 'Login'
            }
        }
    },
    dashboard: {
        name: 'dashboard',
        path: '',
        action: 'DASHBOARD',
        group: 'containers',
        class: 'Dashboard'
    }
}