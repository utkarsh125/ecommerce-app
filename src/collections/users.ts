import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
    slug: "users",//collection name in lower case
    fields: [{//each field is like a row in db
        name: 'role',
        type: 'select',
        options: [
            {label: 'Admin', value: 'admin'},
            {label: 'User', value: 'user'},
        ]
    }]
}