const networkList = process.env.REACT_APP_ALLOWED_NETWORKS && process.env.REACT_APP_ALLOWED_NETWORKS.split(',');
export const ALLOWED_NETWORKS = networkList && networkList.length ? networkList : ['0x1'];

export const FAKE_NOTIFICATION_LIST = [
    {
        picture: '',
        title: 'Title Lorem Ipsum',
        text: '@fuadasa2 has followed you (this month)',
        createdAt: '2021-07-03 12:12:00'
    },
    {
        picture: '',
        title: 'Title Lorem Ipsum',
        text: '@fuadasa2 has followed you (this week)',
        createdAt: '2021-07-14 09:12:00'
    },
    {
        picture: '',
        title: 'Title Lorem Ipsum',
        text: '@fuadasa2 has followed you (this week)',
        createdAt: '2021-07-09 09:12:00'
    },
    {
        picture: '',
        title: 'Title Lorem Ipsum',
        text: '@fuadasa2 has followed you (today)',
        createdAt: '2021-07-16 12:12:00'
    },
    {
        picture: '',
        title: 'Title Lorem Ipsum',
        text: '@fuadasa2 has followed you (today)',
        createdAt: '2021-07-16 12:12:00'
    }
];

export const FAKE_USER_DATA = {
    id: 'string',
    address: 'string',
    email: 'test@test.com',
    displayName: 'Test',
    username: 'test',
    bio: 'string',
    customUrl: 'string',
    avatar: 'string',
    emailPreferences: {
        newSale: false,
        newBid: false,
        likeOnPost: false,
        commentOnPost: false,
        newStaker: false
    },
    linkedAccounts: {
        twitter: 'string',
        facebook: 'string'
    },
    forSale: [
        {
            hashTransaction: 'string',
            incrementId: 0,
            name: 'string',
            description: 'string',
            image: 'string',
            audio: 'string',
            price: 0,
            highestBid: {
                hashTransaction: 'string',
                amount: 0,
                walletId: 'string',
                buyer: {
                    id: 'string',
                    address: 'string',
                    email: 'string',
                    displayName: 'string',
                    bio: 'string',
                    customUrl: 'string',
                    twitter: 'string',
                    avatar: 'string'
                },
                trackId: 'string',
                track: {
                    incrementId: 0,
                    name: 'string',
                    description: 'string',
                    image: 'string',
                    audio: 'string',
                    price: 0
                }
            },
            availableForPurchase: 0,
            onSale: true,
            totalAmount: 0,
            tags: [
                'string'
            ],
            creatorId: 'string',
            creator: {
                id: 'string',
                address: 'string',
                email: 'string',
                displayName: 'string',
                bio: 'string',
                customUrl: 'string',
                twitter: 'string',
                avatar: 'string'
            },
            owners: [
                {
                    walletId: 'string',
                    trackId: 'string',
                    histories: [
                        'string'
                    ],
                    boughtPrice: 0,
                    availableForPurchase: 0,
                    onSale: true,
                    totalAmount: 0,
                    price: 0,
                    owner: {
                        id: 'string',
                        address: 'string',
                        email: 'string',
                        displayName: 'string',
                        bio: 'string',
                        customUrl: 'string',
                        twitter: 'string',
                        avatar: 'string'
                    }
                }
            ],
            collectionId: 'string',
            collection: {
                name: 'string',
                address: 'string',
                walletId: 'string',
                wallet: {
                    id: 'string',
                    address: 'string',
                    email: 'string',
                    displayName: 'string',
                    bio: 'string',
                    customUrl: 'string',
                    twitter: 'string',
                    avatar: 'string'
                },
                isVerified: false
            },
            bids: [
                {
                    hashTransaction: 'string',
                    amount: 0,
                    walletId: 'string',
                    buyer: {
                        id: 'string',
                        address: 'string',
                        email: 'string',
                        displayName: 'string',
                        bio: 'string',
                        customUrl: 'string',
                        twitter: 'string',
                        avatar: 'string'
                    },
                    trackId: 'string',
                    track: {
                        incrementId: 0,
                        name: 'string',
                        description: 'string',
                        image: 'string',
                        audio: 'string',
                        price: 0
                    }
                }
            ],
            histories: [
                {
                    hashTransaction: 'string',
                    trackId: 'string',
                    track: {
                        incrementId: 0,
                        name: 'string',
                        description: 'string',
                        image: 'string',
                        audio: 'string',
                        price: 0
                    },
                    walletId: 'string',
                    wallet: {
                        id: 'string',
                        address: 'string',
                        email: 'string',
                        displayName: 'string',
                        bio: 'string',
                        customUrl: 'string',
                        twitter: 'string',
                        avatar: 'string'
                    },
                    method: [
                        'mint',
                        'transfer',
                        'bid',
                        'cancel',
                        'accept'
                    ],
                    object: {}
                }
            ],
            genres: [
                'hotTracks',
                'topSeller',
                'explore'
            ],
            categories: [
                'Rock',
                'Jazz',
                'HipHop',
                'Electronic',
                'Reggae',
                'RnB',
                'Instrumental',
                'Pop',
                'Classic'
            ],
            followerIds: [
                'string'
            ],
            followers: [
                {
                    id: 'string',
                    address: 'string',
                    email: 'string',
                    displayName: 'string',
                    bio: 'string',
                    customUrl: 'string',
                    twitter: 'string',
                    avatar: 'string'
                }
            ]
        }
    ],
    owned: [
        {
            hashTransaction: 'string',
            incrementId: 0,
            name: 'string',
            description: 'string',
            image: 'string',
            audio: 'string',
            price: 0,
            highestBid: {
                hashTransaction: 'string',
                amount: 0,
                walletId: 'string',
                buyer: {
                    id: 'string',
                    address: 'string',
                    email: 'string',
                    displayName: 'string',
                    bio: 'string',
                    customUrl: 'string',
                    twitter: 'string',
                    avatar: 'string'
                },
                trackId: 'string',
                track: {
                    incrementId: 0,
                    name: 'string',
                    description: 'string',
                    image: 'string',
                    audio: 'string',
                    price: 0
                }
            },
            availableForPurchase: 0,
            onSale: true,
            totalAmount: 0,
            tags: [
                'string'
            ],
            creatorId: 'string',
            creator: {
                id: 'string',
                address: 'string',
                email: 'string',
                displayName: 'string',
                bio: 'string',
                customUrl: 'string',
                twitter: 'string',
                avatar: 'string'
            },
            owners: [
                {
                    walletId: 'string',
                    trackId: 'string',
                    histories: [
                        'string'
                    ],
                    boughtPrice: 0,
                    availableForPurchase: 0,
                    onSale: true,
                    totalAmount: 0,
                    price: 0,
                    owner: {
                        id: 'string',
                        address: 'string',
                        email: 'string',
                        displayName: 'string',
                        bio: 'string',
                        customUrl: 'string',
                        twitter: 'string',
                        avatar: 'string'
                    }
                }
            ],
            collectionId: 'string',
            collection: {
                name: 'string',
                address: 'string',
                walletId: 'string',
                wallet: {
                    id: 'string',
                    address: 'string',
                    email: 'string',
                    displayName: 'string',
                    bio: 'string',
                    customUrl: 'string',
                    twitter: 'string',
                    avatar: 'string'
                },
                isVerified: false
            },
            bids: [
                {
                    hashTransaction: 'string',
                    amount: 0,
                    walletId: 'string',
                    buyer: {
                        id: 'string',
                        address: 'string',
                        email: 'string',
                        displayName: 'string',
                        bio: 'string',
                        customUrl: 'string',
                        twitter: 'string',
                        avatar: 'string'
                    },
                    trackId: 'string',
                    track: {
                        incrementId: 0,
                        name: 'string',
                        description: 'string',
                        image: 'string',
                        audio: 'string',
                        price: 0
                    }
                }
            ],
            histories: [
                {
                    hashTransaction: 'string',
                    trackId: 'string',
                    track: {
                        incrementId: 0,
                        name: 'string',
                        description: 'string',
                        image: 'string',
                        audio: 'string',
                        price: 0
                    },
                    walletId: 'string',
                    wallet: {
                        id: 'string',
                        address: 'string',
                        email: 'string',
                        displayName: 'string',
                        bio: 'string',
                        customUrl: 'string',
                        twitter: 'string',
                        avatar: 'string'
                    },
                    method: [
                        'mint',
                        'transfer',
                        'bid',
                        'cancel',
                        'accept'
                    ],
                    object: {}
                }
            ],
            genres: [
                'hotTracks',
                'topSeller',
                'explore'
            ],
            categories: [
                'Rock',
                'Jazz',
                'HipHop',
                'Electronic',
                'Reggae',
                'RnB',
                'Instrumental',
                'Pop',
                'Classic'
            ],
            followerIds: [
                'string'
            ],
            followers: [
                {
                    id: 'string',
                    address: 'string',
                    email: 'string',
                    displayName: 'string',
                    bio: 'string',
                    customUrl: 'string',
                    twitter: 'string',
                    avatar: 'string'
                }
            ]
        }
    ]
}
