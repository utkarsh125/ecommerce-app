import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: "media",
  hooks: {
    //helpful in defining certain actions
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    imageSizes: [
        {
            name: "thumbnail",
            width: 400,
            height: 300,
            position: 'centre',
        },
        {
            name: "card",
            width: 768,
            height: 1024,
            position: 'centre',
        },
        {
            name: "tablet",
            width: 1024,
            height: undefined,
            position: 'centre',
        },
    ],
    //takes image
    mimeTypes: ['image/*'],
  },
  fields: [
    {
        name: "user",
        type: "relationship",
        relationTo: "users",
        required: true,
    }
  ]
};
