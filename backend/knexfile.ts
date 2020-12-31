module export=
(property) export=: {
    development: {
        client: string;
        useNullAsDefault: boolean;
        connection: {
            filename: string;
        };
        pool: {
            afterCreate: (conn: any, cb: any) => void;
        };
    }
}