import { BigInt,BigDecimal } from "@graphprotocol/graph-ts"
import {
  Marketplace,
  Approval,
  ApprovalForAll,
  BuyPriceSell,
  MintnewNFT,
  NFTClaimed,
  NFTRefunded,
  NewAuction,
  NewBidOnAuction,
  Nftselltotopbidder,
  TokensClaimed,
  Transfer,
  Updatebuyprice,
  NewCollection
} from "../generated/Marketplace/Marketplace";
import { fetchBunnyId, fetchName, fetchSymbol, fetchTokenURI } from "./utils/erc721";
import { toBigDecimal } from "./utils";


export function handleNewcollection(event: NewCollection): void {
  let collection = Collection.load(event.params.CollectionNew.toHex());
  if (!collection) {
  collection =  new Collection(event.params.CollectionNew.toHex())
    // collection.creatorAddress = event.params.;
  
  }
  collection.name = fetchName(event.params.CollectionNew);
  collection.symbol = fetchSymbol(event.params.CollectionNew);
  collection.active = true;
  collection.totalTrades = ZERO_BI;
  collection.totalVolumeBNB = ZERO_BD;
  collection.numberTokensListed = ZERO_BI;
  collection.save();
}


import { NewAuctionScma,Bid,Mint,NFT,User,Transaction,Collection} from "../generated/schema"
let ZERO_BI = BigInt.fromI32(0);
let ONE_BI = BigInt.fromI32(1);
let ZERO_BD = BigDecimal.fromString("0");
export function handleNewAuction(event: NewAuction): void {
  let token = NewAuctionScma.load(event.params.nftId.toString());
  // if(!collection){
  //   collection = new Collection(event.params.addressNFTCollection.toHex())
  // }


//update User
let user = User.load(event.params.mintedBy.toHex());
if(!user){
  user = new User(event.params.mintedBy.toHex());
}
user.numberTokensListed = ONE_BI;
user.numberTokensPurchased = ZERO_BI;
user.numberTokensSold = ZERO_BI;
user.totalVolumeInBNBTokensPurchased = ZERO_BD;
user.totalVolumeInBNBTokensSold = ZERO_BD;
user.numberTokensListed = user.numberTokensListed.plus(ONE_BI);
user.save();

//update collection data..

let collection = Collection.load(event.params.addressNFTCollection.toHex());
if(!collection){
  collection = new Collection(event.params.addressNFTCollection.toHex())
}
collection.numberTokensListed = collection.numberTokensListed.plus(ONE_BI);
collection.save();


let nft = NFT.load(event.params.addressNFTCollection.toHex() + "-" + event.params.nftId.toString())
if(!nft){
  nft  = new NFT(event.params.addressNFTCollection.toHex() + "-" + event.params.nftId.toString())
}
nft.tokenId = event.params.nftId;
collection.nfts = nft.id
// nft.id = collection.id
nft.url = fetchTokenURI(event.params.addressNFTCollection, event.params.nftId);
nft.updatedAt =event.block.timestamp;
nft.currentAskPrice = toBigDecimal(event.params.BuyNowprice, 18);
nft.latestTradedPriceInBNB=ZERO_BD;
nft.totalTrades = ZERO_BI;
nft.save();

///Auction..




  if (!token) {
      token = new NewAuctionScma(event.params.nftId.toString())
  }
  // token.id = event.transaction.hash.toHexString();
  token.index = event.params.index
  token.addressPaymentToken = event.params.addressPaymentToken
  token.NFTID = event.params.nftId
  token.creator = event.transaction.from
  token.currentBidOwner = event.params.currentBidOwner
  token.BuyNowprice = event.params.BuyNowprice
  token.endAuction = event.params.endAuction
  token.bidCount = event.params.bidCount
  token.sold = false
  token.save();



  // nft.collection = collection.id;
}



export function handleMintnewNFT(event: MintnewNFT): void {
    let id = event.params.tokenId.toString();
    let NewAuction = NewAuctionScma.load(event.params.tokenId.toString());
    if (!NewAuction) {
      NewAuction = new NewAuctionScma(id)
  }
  let token = Mint.load(event.params.tokenId.toString());
  let Nft = NFT.load(event.params.tokenId.toString())
  if (!token) {
      token = new Mint(event.params.tokenId.toString())
  }
  // token.id = event.transaction.hash.toHexString();
token.tokenId = event.params.tokenId;
token.url= event.params.metaUrl;
token.mintaddress = event.params.mintaddress;
if (!Nft) {
  Nft = new NFT(event.params.tokenId.toString())
}
Nft.tokenId =event.params.tokenId;
Nft.url= event.params.metaUrl;
Nft.auction= NewAuction.id;
token.save()
Nft.save()
}






export function handleBuyPriceSell(event: BuyPriceSell): void {
  let token = NewAuctionScma.load(event.params.nftId.toString())
    if (!token) {
        token = new NewAuctionScma(event.params.nftId.toString())
    }

    token.sold = true
    token.save()
  }


export function handleNewBidOnAuction(event: NewBidOnAuction): void {
  let id = event.params.nftId.toString();
  let NewAuction = NewAuctionScma.load(event.params.nftId.toString())
  if (!NewAuction) {
    NewAuction = new NewAuctionScma(id)
}
let order = Bid.load(id)
if (!order) {
   order = new Bid( event.params.nftId.toString());
}
order.askPrice = event.params.newBid;
order.tokenId = event.params.nftId;
order.newAuction = NewAuction.id 
order.bidowner = event.transaction.from;
NewAuction.save();
order.save();
}


export function handleUpdatebuyprice(event: Updatebuyprice): void {
  let token = NewAuctionScma.load(event.params.nftId.toString())
    if (!token) {
        token = new NewAuctionScma(event.params.nftId.toString())
    }
    token.BuyNowprice = event.params.newpirce;
    token.save()
  }
