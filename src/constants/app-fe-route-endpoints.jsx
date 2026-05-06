export const ROUTE_PATHS = {
    SUPER_ADMIN : {
        root : '/super-admin',
        way : {
            index : '/'
        }
    },

    WAY : {
        root : '/car-way-management',
        new : 'new',
        edit : (wayId = 'wayId') => `edit/${wayId}`
    }
}