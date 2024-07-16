import type { IProposalActionWithdrawToken, IProposalAction } from "../../proposalActionTypes";


export const withdrawActionsMock: IProposalAction[] = [
    {
        type: 'withdrawToken',
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
        contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        token: {
            name: 'DAI Stablecoin',
            symbol: 'DAI',
            decimals: 18,
            logo: 'https://assets.coingecko.com/coins/images/9956/small/4943.png',
            priceUsd: '1.00',
        },
    } as IProposalActionWithdrawToken,
    {
        type: 'withdrawToken',
        from: '0x53d284357ec70ce289d6d64134dfac8e511c8a3d',
        to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        data: '',
        value: '0',
        inputData: {
            function: 'transfer',
            contract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48',
            parameters: [
                { type: 'address', value: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
                { type: 'uint256', value: '500000000' },
            ],
        },
        sender: { address: '0x53d284357ec70ce289d6d64134dfac8e511c8a3d' },
        receiver: { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
        amount: '500',
        contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48',
        token: {
            name: 'USD Coin',
            symbol: 'USDC',
            decimals: 6,
            logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
            priceUsd: '1.00',
        },
    } as IProposalActionWithdrawToken,
    {
        type: 'withdrawToken',
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
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        token: {
            name: 'Tether',
            symbol: 'USDT',
            decimals: 6,
            logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
            priceUsd: '1.00',
        },
    } as IProposalActionWithdrawToken,
];