import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users",//collection name in lower case
    auth: {
        verify: {
            generateEmailHTML: ({token}) => {
                return `<p>Hello please verify</p>`
            }
        }
    },
    access: {
        read: () => true,
        create: () => true,
    },
    fields: [{//each field is like a row in db
        name: 'role',
        defaultValue:'user',
        // admin: {
        //     condition: () => false
        // },
        type: 'select',
        options: [
            {label: 'Admin', value: 'admin'},
            {label: 'User', value: 'user'},
        ]
    }]
}