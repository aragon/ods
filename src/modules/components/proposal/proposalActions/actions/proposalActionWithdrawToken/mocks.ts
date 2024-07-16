import type { IProposalActionWithdrawToken } from "../../proposalActionsTypes";

export const withdrawActionsMock: IProposalActionWithdrawToken[] = [
    {
        type: 'withdrawToken',
        contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
        data: '',
        value: '0',
        inputData: {
            function: 'transfer',
            contract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            parameters: [
                { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
                { type: 'uint256', value: '1000000000000000000' },
            ],
        },
        sender: { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
        receiver: { address: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
        amount: '1',
        token: {
            name: 'DAI Stablecoin',
            symbol: 'DAI',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/9956/small/4943.png',
            priceUsd: '1.00',
            address: '0xdAC17Ffad2ee523a2206206994597C13D831ec7',
        },
    } ,
    {
        type: 'withdrawToken',
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        from: '0x281055afc982d96Fab65b3a49CaDbBFD9727781a',
        to: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE',
        data: '',
        value: '0',
        inputData: {
            function: 'transfer',
            contract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            parameters: [
                { type: 'address', value: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
                { type: 'uint256', value: '2000000' },
            ],
        },
        sender: { address: '0x281055afc982d96Fab65b3a49CaDbBFD9727781a' },
        receiver: { address: '0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936F0bE' },
        amount: '2',
        token: {
            name: 'Tether',
            symbol: 'USDT',
            decimals: 6,
            logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
            priceUsd: '1.00',
            address: '0xdAC17Ffad2ee523a2206206994597C13D831ec7',
        },
    },
    {
        type: 'withdrawToken',
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        from: '0x1234567890abcdef1234567890abcdef12345678',
        to: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        data: '',
        value: '0',
        inputData: null, // Unverified action with missing input data
        sender: { address: '0x1234567890abcdef1234567890abcdef12345678' },
        receiver: { address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd' },
        amount: '100',
        token: {
            name: 'Example Token',
            symbol: 'EXT',
            decimals: 18,
            logo: 'https://cryptologos.cc/logos/example-token-logo.png', // Placeholder logo
            priceUsd: '0.50',
            address: '0x1234567890abcdef1234567890abcdef12345678',
        },
    },
];
