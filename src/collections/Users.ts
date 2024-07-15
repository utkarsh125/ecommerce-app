import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users", // Collection name in lower case
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                return `
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                        <h2>Welcome to Our Service!</h2>
                        <p>Thank you for signing up. Please verify your account by clicking the button below:</p>
                        <a 
                            href='${process.env.PUBLIC_SERVER_URL}/verify-email?token=${token}' 
                            style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
                            Verify Account
                        </a>
                        <p>If you did not sign up for this account, please disregard this email.</p>
                        <p>Best regards,<br>Digital Hippo</p>
                    </div>
                `;
            }
        }
    },
    access: {
        read: () => true,
        create: () => true,
    },
    fields: [
        {
            name: 'role',
            defaultValue: 'user',
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' },
            ]
        }
    ]
};
