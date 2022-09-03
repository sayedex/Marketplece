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
import { updateCollectionDayData, updateMarketPlaceDayData } from "./utils/dayUpdates";
import { toBigDecimal } from "./utils";
import { AskOrder,NFT,User,Transaction,Collection,Bid} from "../generated/schema"
let ZERO_BI = BigInt.fromI32(0);
let ONE_BI = BigInt.fromI32(1);
let ZERO_BD = BigDecimal.fromString("0");
let ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";



export function handleNewAuction(event: NewAuction): void {
let id =  event.params.addressNFTCollection.toHex()
let collection = Collection.load(id)
if(!collection){
  collection = new Collection(id)
}
collection.name = fetchName(event.params.addressNFTCollection);
collection.symbol = fetchSymbol(event.params.addressNFTCollection);
collection.active = true;
collection.totalTrades = ZERO_BI;
collection.totalVolumeBNB = ZERO_BD;
collection.numberTokensListed = ZERO_BI;
collection.save();

//load user ...

let user  = User.load(event.params.mintedBy.toHex());
if(user===null){
user  = new User(event.params.mintedBy.toHex());
user.numberTokensListed = ONE_BI;
user.numberTokensPurchased = ZERO_BI;
user.numberTokensSold = ZERO_BI;
user.totalVolumeInBNBTokensPurchased = ZERO_BD;
user.totalVolumeInBNBTokensSold = ZERO_BD;
user.save()
}
user.numberTokensListed = user.numberTokensListed.plus(ONE_BI);
user.save()





//load collection..




//load nft data...
let token = NFT.load(event.params.addressNFTCollection.toHex() + "-" + event.params.nftId.toString());

if(token===null){
  token = new NFT(event.params.addressNFTCollection.toHex() + "-" + event.params.nftId.toString());
token.tokenId = event.params.nftId;
token.collection = collection.id;
token.metadataUrl = fetchTokenURI(event.params.addressNFTCollection, event.params.nftId);
token.updatedAt = event.block.timestamp;
token.currentAskPrice = toBigDecimal(event.params.BuyNowprice, 18);
token.currentSeller = event.params.mintedBy.toHex();
token.isTradable = true;
token.save()
}
token.updatedAt = event.block.timestamp;
token.currentAskPrice = toBigDecimal(event.params.BuyNowprice, 18);
token.currentSeller = event.params.mintedBy.toHex();
token.isTradable = true;

let order = new AskOrder(event.transaction.hash.toHex());
order.block = event.block.number;
order.index = event.params.index;
order.timestamp = event.block.timestamp;
order.collection = collection.id;
order.nft = token.id;
// order.orderType = "New";
order.askPrice = toBigDecimal(event.params.BuyNowprice, 18);
order.seller = user.id;
order.save();

}



// export function handleMintnewNFTA(event: MintnewNFT): void {
//     let id = event.params.tokenId.toString();
//     let NewAuction = NewAuctionScma.load(event.params.tokenId.toString());
//     if (!NewAuction) {
//       NewAuction = new NewAuctionScma(id)
//   }
//   let token = Mint.load(event.params.tokenId.toString());
//   let Nft = NFT.load(event.params.tokenId.toString())
//   if (!token) {
//       token = new Mint(event.params.tokenId.toString())
//   }
//   // token.id = event.transaction.hash.toHexString();
// token.tokenId = event.params.tokenId;
// token.url= event.params.metaUrl;
// token.mintaddress = event.params.mintaddress;
// if (!Nft) {
//   Nft = new NFT(event.params.tokenId.toString())
// }
// Nft.tokenId =event.params.tokenId;
// Nft.url= event.params.metaUrl;
// Nft.auction= NewAuction.id;
// token.save()
// Nft.save()
// }

export function handleNewBidOnAuction(event: NewBidOnAuction): void {
  let id = event.transaction.hash.toHex();
  let askorder = AskOrder.load(event.params.index.toString())
  if (!askorder) {
    askorder = new AskOrder(id)
}
let order = Bid.load(id)
if (!order) {
   order = new Bid(id);
}
order.bidprice = toBigDecimal(event.params.newBid, 18);
order.tokenId = event.params.nftId;
order.bid = askorder.id 
// order.bidder = askorder.id
order.bidowner = event.transaction.from;
// askorder.save();
order.save();
askorder.save();
}


export function handleBuyPriceSell(event: BuyPriceSell): void {
 
  let buyer = User.load(event.params.buyer.toHex());

  // Buyer may not exist
  if (buyer === null) {
    buyer = new User(event.params.buyer.toHex());
    buyer.numberTokensListed = ZERO_BI;
    buyer.numberTokensPurchased = ONE_BI; // 1 token purchased
    buyer.numberTokensSold = ZERO_BI;
    buyer.totalVolumeInBNBTokensPurchased = toBigDecimal(event.params.Pirce, 18);
    buyer.totalVolumeInBNBTokensSold = ZERO_BD;
  } else {
    buyer.numberTokensPurchased = buyer.numberTokensPurchased.plus(ONE_BI);
    buyer.totalVolumeInBNBTokensPurchased = buyer.totalVolumeInBNBTokensPurchased.plus(
      toBigDecimal(event.params.Pirce, 18)
    );

  }


  // 2. Seller
  let seller = User.load(event.params.seller.toHex());

if(!seller){
  seller  = new User(event.params.seller.toHex())
}
  seller.numberTokensSold = seller.numberTokensSold.plus(ONE_BI);
  seller.numberTokensListed = seller.numberTokensListed.minus(ONE_BI);
  seller.totalVolumeInBNBTokensSold = seller.totalVolumeInBNBTokensSold.plus(toBigDecimal(event.params.Pirce, 18));


  // 3. Collection
  let collection = Collection.load(event.params.addressNFTCollection.toHex());
  if (collection !== null) {
    collection.totalTrades = collection.totalTrades.plus(ONE_BI);
    collection.totalVolumeBNB = collection.totalVolumeBNB.plus(toBigDecimal(event.params.Pirce, 18));
    collection.numberTokensListed = collection.numberTokensListed.minus(ONE_BI);
    collection.save();
  }

  // 4. NFT
  let tokenConcatId = event.params.addressNFTCollection.toHex() + "-" + event.params.nftId.toString();


let token  = NFT.load(tokenConcatId);
if(!token){
  token = new NFT(tokenConcatId)
}

token.latestTradedPriceInBNB = toBigDecimal(event.params.Pirce, 18);
// token.tradeVolumeBNB = token.tradeVolumeBNB.plus(token.latestTradedPriceInBNB);
token.updatedAt = event.block.timestamp;
token.totalTrades = token.totalTrades.plus(ONE_BI);
token.currentAskPrice = ZERO_BD;
token.currentSeller = ZERO_ADDRESS;
token.isTradable = false;




  // 5. Transaction

  let transaction = new Transaction(event.transaction.hash.toHex());
  if(!transaction){
    transaction = new Transaction(event.transaction.hash.toHex())
  }
  transaction.block = event.block.number;
  transaction.timestamp = event.block.timestamp;
  transaction.collection = event.params.addressNFTCollection.toHex();
  transaction.nft = event.params.addressNFTCollection.toHex() + "-" + event.params.nftId.toString();
  transaction.askPrice = toBigDecimal(event.params.Pirce, 18);
  transaction.netPrice = toBigDecimal(event.params.Pirce, 18);

  transaction.buyer = event.params.buyer.toHex();
  transaction.seller = event.params.seller.toHex();

  // transaction.withBNB = event.params.withBNB;

  transaction.save();
  buyer.save();
  seller.save();
  token.save();


  updateCollectionDayData(event.params.addressNFTCollection, toBigDecimal(event.params.Pirce, 18), event);
  updateMarketPlaceDayData(toBigDecimal(event.params.Pirce, 18), event);

}


  export function handleUpdatebuyprice(event: Updatebuyprice): void {

  
  }

  export function handleNftselltotopbidder(event: Nftselltotopbidder): void {

    }
  