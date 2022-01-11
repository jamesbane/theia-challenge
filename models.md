# API convention document

### Table of contents:

[1. Wallet](#1-wallet)
- [1.1 Notification list](#11-notification-list)
  
[2. Search](#2-search)
- [2.1 Search results list](#21-search-results-list)

[3. Tracks](#3-tracks)
- [3.1 Track list](#31-track-list)
- [3.3 Track detail](#32-track-detail)

[4. Common](#4-common)
- [4.1 Common data](#41-common-data)

[5. Bidding](#5-bidding)
- [5.1 Apply bid](#51-apply-bid)

## [1. Wallet]()

### 1.1 Notification list

#### Request:
`POST /api/wallets/notifications`

#### Params:

1. `address`: Blockchain address to identify the user wallets

#### Response:
```
[
    {
        picture: <str: url>,
        title: <str>,
        text: <str> # notification description,
        createdAt: <datetime>
    },
    ...
]
```

#### UI Examples:
<details>
<summary>Click to expand</summary>

![screen](https://gitlab.com/Stanislavskiy1/nifter-app/-/raw/develop/readme_assets/1-1.png?raw=true)

</details>


## [2. Search]()

### 2.1 Search results list
– Must perform a search between tracks, users and collections for a given query

#### Request:
`GET /api/{wallets|tracks|collections}/search`

#### Params:
1. `query`
2. `offset`(Optional): 0 by default
3. `limit`(Optional): 20 by default

#### Response:
##### Wallets:
```
{   

    offset: <int>,
    limit: <int>,
    items: [
        {
            avatar: <str: url>,
            address: <str: blockchain address>,
            name: <str>,
            isVerified: <bool>
        },
        ...
    ]
}

```
##### Tracks:
```
{   
    offset: <int>,
    limit: <int>,
    items: [
        {
            id: <str>,
            name: <str>,
            image: <str: url>',
            price: <float>,
            highestBid: {
                amount: <float>,
                # The user, who made a bid:
                buyer: {
                    name: <str>,
                    address: <str: blockchain address>
                }
            },
            availableForPurchase: <int>,
            totalAmount: <int>,
            creator: {
                name: <str>,
                avatar: <str: url>,
                address: <str: blockchain address>,
                isVerified: <bool>
            }
        },
        ...
    ]
}
```
##### Collections:

```
{   
    offset: <int>,
    limit: <int>,
    items: [
        {
            avatar: <str: url>,
            address: <str: blockchain address>,
            name: <str>,
            isVerified: <bool>
        },
        ...
    ]
}
```

#### UI Examples:
<details>
<summary>Click to expand</summary>

![screen](https://gitlab.com/Stanislavskiy1/nifter-app/-/raw/develop/readme_assets/2-1.png?raw=true)

</details>

## [3. Tracks]()

### 3.1 Track list

#### Request:
`GET /api/tracks`

#### Params
1. `category` (Optional): Possible values are 'hotTracks', 'topSeller', 'explore'
2. `genre`(Optional): Possible values are 'Rock', 'Jazz', 'Hip hop', 'Electronic', 'Reggae', 'R&B', 'Instrumental', 'Pop', 'Classic'
4. `limit`(Optional): 20 by default
5. `offset`(Optional): 0 by default
6. `author`(Optional): Author blockchain address
7. `collection`(Optional): Collection blockchain address

#### Response:
```
{
    offset: <int>,
    limit: <int>,
    items: [
        {
            id: <str>,
            name: <str>,
            image: <str: url>',
            price: <float>,
            highestBid: {
                amount: <float>,
                # The user, who made a bid:
                buyer: {
                    name: <str>,
                    address: <str: blockchain address>
                }
            },
            availableForPurchase: <int>,
            totalAmount: <int>,
            creator: {
                name: <str>,
                avatar: <str: url>,
                address: <str: blockchain address>,
                isVerified: <bool>
            }
        },
    ]
}
```

#### UI Examples:
<details>
<summary>Click to expand</summary>

![screen](https://gitlab.com/Stanislavskiy1/nifter-app/-/raw/develop/readme_assets/3-1-1.png?raw=true)

![screen](https://gitlab.com/Stanislavskiy1/nifter-app/-/raw/develop/readme_assets/3-1-2.png?raw=true)
</details>

### 3.2 Track detail

#### Request:
`GET /api/tracks/{id}`

#### Response:
```
{
    id: <str>,
    name: <str>,
    description: <str>,
    image: <str: url>,
    audio: <str: url>,
    price: <float>,
    bids: [
        {
            amount: <float>,
            buyer: {
                name: <str>,
                address: <str: blockchain address>
            }
        },
        ...
    ],
    availableForPurchase: <int>,
    totalAmount: <int>,
    tags: <str: tag list separated by comma>,
    createdAt: <str: date>,
    collection: {
        name: <str>,
        avatar: <str: url>,
        address: <str: blockchain address>
    },
    creator: {
        name: <str>,
        avatar: <str: url>,
        address: <str: blockchain address>
        isVerified: <bool>
    },
    owners: [
        {
            name: <str>,
            avatar: <str: url>,
            address: <str: blockchain address>
            isVerified: bool
        },
        ...
    ]
};
```

#### UI Examples:
<details>
<summary>Click to expand</summary>

![screen](https://gitlab.com/Stanislavskiy1/nifter-app/-/raw/develop/readme_assets/3-2.png?raw=true)

</details>

## [4. Common]()

### 4.1 Common data

#### Request:
`GET /api/common`

#### Response:
```
{
    ethereumPrice: <float>,
    wrappedEthereumPrice: <float>,
    feeAmount: <int: percentage value (0-100)>
}
```

## [5. Bidding]()

### 5.1 Apply bid

#### Request:
`POST /api/bidding/apply`

#### Params
1. `amount`: amount of WETH 
2. `asset`: asset address
