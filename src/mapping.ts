import { BigInt,BigDecimal } from "@graphprotocol/graph-ts"
import {
  TokenListed,
  TokenBought,
  TokenBidEntered,
  TokenBidWithdrawn,
  TokenBidAccepted
} from "../generated/NFTKEYMarketplaceV2/NFTKEYMarketplaceV2"
import { fetchBunnyId, fetchName, fetchSymbol, fetchTokenURI } from "./utils/erc721";
import { updateCollectionDayData, updateMarketPlaceDayData } from "./utils/dayUpdates";
import { toBigDecimal } from "./utils";
import { AskOrder,NFT,Duser as User,Transaction,Collection,Bid} from "../generated/schema"
let ZERO_BI = BigInt.fromI32(0);
let ONE_BI = BigInt.fromI32(1);
let ZERO_BD = BigDecimal.fromString("0");
let ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";



export function handleNewAuction(event: TokenListed): void {
let id =  event.params.erc721Address.toHex()
let collection = Collection.load(id)
if(!collection){
  collection = new Collection(id)
}
collection.name = fetchName(event.params.erc721Address);
collection.symbol = fetchSymbol(event.params.erc721Address);
collection.active = true;
collection.totalTrades = ZERO_BI;
collection.totalVolumeBNB = ZERO_BD;
// collection.numberTokensListed = ZERO_BI;
collection.numberTokensListed = collection.numberTokensListed.plus(ONE_BI);
collection.save();

//load user ...

let user  = User.load(event.params.seller.toHex());
if(user===null){
user  = new User(event.params.seller.toHex());
user.useraddress = event.params.seller.toHex()+ "-" + ONE_BI.toString();
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
let token = NFT.load(event.params.erc721Address.toHex() + "-" + event.params.tokenId.toString());

if(token===null){
  token = new NFT(event.params.erc721Address.toHex() + "-" + event.params.tokenId.toString());
token.tokenId = event.params.tokenId;
token.collection = collection.id;
token.metadataUrl = fetchTokenURI(event.params.erc721Address, event.params.tokenId);
token.updatedAt = event.block.timestamp;
token.currentAskPrice = toBigDecimal(event.params.price, 18);
token.currentSeller = event.params.seller.toHex();
token.isTradable = true;
token.save()
}
token.updatedAt = event.block.timestamp;
token.currentAskPrice = toBigDecimal(event.params.price, 18);
token.currentSeller = event.params.seller.toHex();
token.isTradable = true;

let order = new AskOrder(event.transaction.hash.toHex());
order.block = event.block.number;
// order.index = event.params.index;
order.timestamp = event.block.timestamp;
order.collection = collection.id;
order.nft = token.id;
// order.orderType = "New";
order.askPrice = toBigDecimal(event.params.price, 18);
order.seller = user.id;
order.save();

}





 export function handleNewBidOnAuction(event: TokenBidEntered): void {
  let tokenConcatId = event.params.erc721Address.toHex() + "-" + event.params.tokenId.toString();

  let token  = NFT.load(tokenConcatId);
  if(!token){
    token = new NFT(tokenConcatId)
  }
 let order = Bid.load(tokenConcatId)
 if (!order) {
   order = new Bid(tokenConcatId);
   }
order.bidprice = toBigDecimal(event.params.newbid, 18);
order.active = true;
 order.tokenId = event.params.tokenId;
order.bid = token.id
order.bidowner = event.transaction.from;
//bid timestap..
order.save();
token.save();
}


export function handleBuyPriceSell(event: TokenBought): void {
 
  let buyer = User.load(event.params.buyer.toHex());

  // Buyer may not exist
  if (buyer === null) {
    buyer = new User(event.params.buyer.toHex());
    buyer.useraddress = event.params.buyer.toHex()+ "-" + ONE_BI.toString();
    buyer.numberTokensListed = ZERO_BI;
    buyer.numberTokensPurchased = ONE_BI; // 1 token purchased
    buyer.numberTokensSold = ZERO_BI;
    buyer.totalVolumeInBNBTokensPurchased = toBigDecimal(event.params.price, 18);
    buyer.totalVolumeInBNBTokensSold = ZERO_BD;
  } else {
    buyer.numberTokensPurchased = buyer.numberTokensPurchased.plus(ONE_BI);
    buyer.totalVolumeInBNBTokensPurchased = buyer.totalVolumeInBNBTokensPurchased.plus(
      toBigDecimal(event.params.price, 18)
    );

  }


  // 2. Seller
  let seller = User.load(event.params.seller.toHex());

if(!seller){
  seller  = new User(event.params.seller.toHex())
}
  seller.useraddress = event.params.seller.toHex()+ "-" + ONE_BI.toString();
  seller.numberTokensSold = seller.numberTokensSold.plus(ONE_BI);
  seller.numberTokensListed = seller.numberTokensListed.minus(ONE_BI);
  seller.totalVolumeInBNBTokensSold = seller.totalVolumeInBNBTokensSold.plus(toBigDecimal(event.params.price, 18));


  // 3. Collection
  let collection = Collection.load(event.params.erc721Address.toHex());
  if (collection !== null) {
    collection.totalTrades = collection.totalTrades.plus(ONE_BI);
    collection.totalVolumeBNB = collection.totalVolumeBNB.plus(toBigDecimal(event.params.price, 18));
    collection.numberTokensListed = collection.numberTokensListed.minus(ONE_BI);
    collection.save();
  }

  // 4. NFT
  let tokenConcatId = event.params.erc721Address.toHex() + "-" + event.params.tokenId.toString();


let token  = NFT.load(tokenConcatId);
if(!token){
  token = new NFT(tokenConcatId)
}

token.latestTradedPriceInBNB = toBigDecimal(event.params.price, 18);
// token.tradeVolumeBNB = token.tradeVolumeBNB.plus(token.latestTradedPriceInBNB);
token.updatedAt = event.block.timestamp;
token.totalTrades = token.totalTrades.plus(ONE_BI);
token.currentAskPrice = toBigDecimal(event.params.price, 18);;
token.currentSeller = ZERO_ADDRESS;
token.isTradable = false;




  // 5. Transaction

  let transaction = new Transaction(event.transaction.hash.toHex());
  if(!transaction){
    transaction = new Transaction(event.transaction.hash.toHex())
  }
  transaction.block = event.block.number;
  transaction.timestamp = event.block.timestamp;
  transaction.collection = event.params.erc721Address.toHex();
  transaction.nft = event.params.erc721Address.toHex() + "-" + event.params.tokenId.toString();
  transaction.askPrice = toBigDecimal(event.params.price, 18);
  transaction.netPrice = toBigDecimal(event.params.price, 18);

  transaction.buyer = event.params.buyer.toHex();
  transaction.seller = event.params.seller.toHex();

  // transaction.withBNB = event.params.withBNB;

  transaction.save();
  buyer.save();
  seller.save();
  token.save();


  updateCollectionDayData(event.params.erc721Address, toBigDecimal(event.params.price, 18), event);
  updateMarketPlaceDayData(toBigDecimal(event.params.price, 18), event);

}


  export function handleTokenBidWithdrawn(event: TokenBidWithdrawn): void {
    let tokenConcatId = event.params.erc721Address.toHex() + "-" + event.params.tokenId.toString();
    // let token  = NFT.load(tokenConcatId);
    // if(!token){
    //   token = new NFT(tokenConcatId)
    // }
    let order = Bid.load(tokenConcatId)
    if (!order) {
      order = new Bid(tokenConcatId);
      }
      order.active = false;
      order.save()
 }

  // export function handleNftselltotopbidder(event: Nftselltotopbidder): void {

  //   }
  export function handleBidaccepted(event: TokenBidAccepted): void {
    
    let tokenConcatId = event.params.erc721Address.toHex() + "-" + event.params.tokenId.toString();

   let buyer = User.load(event.params.buyer.toHex());

  // Buyer may not exist
  if (buyer === null) {
    buyer = new User(event.params.buyer.toHex());
    buyer.useraddress =  event.params.buyer.toHex()+ "-" + ONE_BI.toString();
    buyer.numberTokensListed = ZERO_BI;
    buyer.numberTokensPurchased = ONE_BI; // 1 token purchased
    buyer.numberTokensSold = ZERO_BI;
    buyer.totalVolumeInBNBTokensPurchased = toBigDecimal(event.params.price, 18);
    buyer.totalVolumeInBNBTokensSold = ZERO_BD;
  } else {
    buyer.numberTokensPurchased = buyer.numberTokensPurchased.plus(ONE_BI);
    buyer.totalVolumeInBNBTokensPurchased = buyer.totalVolumeInBNBTokensPurchased.plus(
      toBigDecimal(event.params.price, 18)
    );

  }


  // 2. Seller
  let seller = User.load(event.params.seller.toHex());

if(!seller){
  seller  = new User(event.params.seller.toHex())
}
  seller.useraddress = event.params.seller.toHex()+ "-" + ONE_BI.toString();
  seller.numberTokensSold = seller.numberTokensSold.plus(ONE_BI);
  seller.numberTokensListed = seller.numberTokensListed.minus(ONE_BI);
  seller.totalVolumeInBNBTokensSold = seller.totalVolumeInBNBTokensSold.plus(toBigDecimal(event.params.price, 18));


  // 3. Collection
  let collection = Collection.load(event.params.erc721Address.toHex());
  if (collection !== null) {
    collection.totalTrades = collection.totalTrades.plus(ONE_BI);
    collection.totalVolumeBNB = collection.totalVolumeBNB.plus(toBigDecimal(event.params.price, 18));
    collection.numberTokensListed = collection.numberTokensListed.minus(ONE_BI);
    collection.save();
  }

  // 4. NFT



let token  = NFT.load(tokenConcatId);
if(!token){
  token = new NFT(tokenConcatId)
}

token.latestTradedPriceInBNB = toBigDecimal(event.params.price, 18);
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
  transaction.collection = event.params.erc721Address.toHex();
  transaction.nft = event.params.erc721Address.toHex() + "-" + event.params.tokenId.toString();
  transaction.askPrice = toBigDecimal(event.params.price, 18);
  transaction.netPrice = toBigDecimal(event.params.price, 18);

  transaction.buyer = event.params.buyer.toHex();
  transaction.seller = event.params.seller.toHex();

  // transaction.withBNB = event.params.withBNB;

  transaction.save();
  buyer.save();
  seller.save();
  token.save();


  updateCollectionDayData(event.params.erc721Address, toBigDecimal(event.params.price, 18), event);
  updateMarketPlaceDayData(toBigDecimal(event.params.price, 18), event);

 }
