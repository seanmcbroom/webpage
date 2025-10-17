export const module = {
    rules: [
        {
            test: /\.(png|jpeg|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        },
    ],
};