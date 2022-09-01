// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class NewAuctionScma extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("index", Value.fromBigInt(BigInt.zero()));
    this.set("addressPaymentToken", Value.fromBytes(Bytes.empty()));
    this.set("NFTID", Value.fromBigInt(BigInt.zero()));
    this.set("creator", Value.fromBytes(Bytes.empty()));
    this.set("addressNFTCollection", Value.fromBytes(Bytes.empty()));
    this.set("currentBidOwner", Value.fromBytes(Bytes.empty()));
    this.set("currentBidPrice", Value.fromBigInt(BigInt.zero()));
    this.set("BuyNowprice", Value.fromBigInt(BigInt.zero()));
    this.set("endAuction", Value.fromBigInt(BigInt.zero()));
    this.set("bidCount", Value.fromBigInt(BigInt.zero()));
    this.set("sold", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NewAuctionScma entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type NewAuctionScma must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("NewAuctionScma", id.toString(), this);
    }
  }

  static load(id: string): NewAuctionScma | null {
    return changetype<NewAuctionScma | null>(store.get("NewAuctionScma", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get index(): BigInt {
    let value = this.get("index");
    return value!.toBigInt();
  }

  set index(value: BigInt) {
    this.set("index", Value.fromBigInt(value));
  }

  get addressPaymentToken(): Bytes {
    let value = this.get("addressPaymentToken");
    return value!.toBytes();
  }

  set addressPaymentToken(value: Bytes) {
    this.set("addressPaymentToken", Value.fromBytes(value));
  }

  get NFTID(): BigInt {
    let value = this.get("NFTID");
    return value!.toBigInt();
  }

  set NFTID(value: BigInt) {
    this.set("NFTID", Value.fromBigInt(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    return value!.toBytes();
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get addressNFTCollection(): Bytes {
    let value = this.get("addressNFTCollection");
    return value!.toBytes();
  }

  set addressNFTCollection(value: Bytes) {
    this.set("addressNFTCollection", Value.fromBytes(value));
  }

  get currentBidOwner(): Bytes {
    let value = this.get("currentBidOwner");
    return value!.toBytes();
  }

  set currentBidOwner(value: Bytes) {
    this.set("currentBidOwner", Value.fromBytes(value));
  }

  get currentBidPrice(): BigInt {
    let value = this.get("currentBidPrice");
    return value!.toBigInt();
  }

  set currentBidPrice(value: BigInt) {
    this.set("currentBidPrice", Value.fromBigInt(value));
  }

  get BuyNowprice(): BigInt {
    let value = this.get("BuyNowprice");
    return value!.toBigInt();
  }

  set BuyNowprice(value: BigInt) {
    this.set("BuyNowprice", Value.fromBigInt(value));
  }

  get endAuction(): BigInt {
    let value = this.get("endAuction");
    return value!.toBigInt();
  }

  set endAuction(value: BigInt) {
    this.set("endAuction", Value.fromBigInt(value));
  }

  get bidCount(): BigInt {
    let value = this.get("bidCount");
    return value!.toBigInt();
  }

  set bidCount(value: BigInt) {
    this.set("bidCount", Value.fromBigInt(value));
  }

  get sold(): boolean {
    let value = this.get("sold");
    return value!.toBoolean();
  }

  set sold(value: boolean) {
    this.set("sold", Value.fromBoolean(value));
  }

  get bider(): Array<string> {
    let value = this.get("bider");
    return value!.toStringArray();
  }

  set bider(value: Array<string>) {
    this.set("bider", Value.fromStringArray(value));
  }

  get nftdata(): Array<string> {
    let value = this.get("nftdata");
    return value!.toStringArray();
  }

  set nftdata(value: Array<string>) {
    this.set("nftdata", Value.fromStringArray(value));
  }

  get user(): Array<string> {
    let value = this.get("user");
    return value!.toStringArray();
  }

  set user(value: Array<string>) {
    this.set("user", Value.fromStringArray(value));
  }
}

export class Bid extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("askPrice", Value.fromBigInt(BigInt.zero()));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("newAuction", Value.fromString(""));
    this.set("bidowner", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bid entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Bid must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Bid", id.toString(), this);
    }
  }

  static load(id: string): Bid | null {
    return changetype<Bid | null>(store.get("Bid", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get askPrice(): BigInt {
    let value = this.get("askPrice");
    return value!.toBigInt();
  }

  set askPrice(value: BigInt) {
    this.set("askPrice", Value.fromBigInt(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get newAuction(): string {
    let value = this.get("newAuction");
    return value!.toString();
  }

  set newAuction(value: string) {
    this.set("newAuction", Value.fromString(value));
  }

  get bidowner(): Bytes {
    let value = this.get("bidowner");
    return value!.toBytes();
  }

  set bidowner(value: Bytes) {
    this.set("bidowner", Value.fromBytes(value));
  }
}

export class Collection extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("name", Value.fromString(""));
    this.set("symbol", Value.fromString(""));
    this.set("active", Value.fromBoolean(false));
    this.set("totalTrades", Value.fromBigInt(BigInt.zero()));
    this.set("totalVolumeBNB", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("numberTokensListed", Value.fromBigInt(BigInt.zero()));
    this.set("nfts", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Collection entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Collection must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Collection", id.toString(), this);
    }
  }

  static load(id: string): Collection | null {
    return changetype<Collection | null>(store.get("Collection", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get active(): boolean {
    let value = this.get("active");
    return value!.toBoolean();
  }

  set active(value: boolean) {
    this.set("active", Value.fromBoolean(value));
  }

  get totalTrades(): BigInt {
    let value = this.get("totalTrades");
    return value!.toBigInt();
  }

  set totalTrades(value: BigInt) {
    this.set("totalTrades", Value.fromBigInt(value));
  }

  get totalVolumeBNB(): BigDecimal {
    let value = this.get("totalVolumeBNB");
    return value!.toBigDecimal();
  }

  set totalVolumeBNB(value: BigDecimal) {
    this.set("totalVolumeBNB", Value.fromBigDecimal(value));
  }

  get numberTokensListed(): BigInt {
    let value = this.get("numberTokensListed");
    return value!.toBigInt();
  }

  set numberTokensListed(value: BigInt) {
    this.set("numberTokensListed", Value.fromBigInt(value));
  }

  get nfts(): string {
    let value = this.get("nfts");
    return value!.toString();
  }

  set nfts(value: string) {
    this.set("nfts", Value.fromString(value));
  }

  get dayData(): Array<string> {
    let value = this.get("dayData");
    return value!.toStringArray();
  }

  set dayData(value: Array<string>) {
    this.set("dayData", Value.fromStringArray(value));
  }
}

export class CollectionDayData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("date", Value.fromI32(0));
    this.set("collection", Value.fromString(""));
    this.set("dailyVolumeBNB", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("dailyTrades", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CollectionDayData entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CollectionDayData must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CollectionDayData", id.toString(), this);
    }
  }

  static load(id: string): CollectionDayData | null {
    return changetype<CollectionDayData | null>(
      store.get("CollectionDayData", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get date(): i32 {
    let value = this.get("date");
    return value!.toI32();
  }

  set date(value: i32) {
    this.set("date", Value.fromI32(value));
  }

  get collection(): string {
    let value = this.get("collection");
    return value!.toString();
  }

  set collection(value: string) {
    this.set("collection", Value.fromString(value));
  }

  get dailyVolumeBNB(): BigDecimal {
    let value = this.get("dailyVolumeBNB");
    return value!.toBigDecimal();
  }

  set dailyVolumeBNB(value: BigDecimal) {
    this.set("dailyVolumeBNB", Value.fromBigDecimal(value));
  }

  get dailyTrades(): BigInt {
    let value = this.get("dailyTrades");
    return value!.toBigInt();
  }

  set dailyTrades(value: BigInt) {
    this.set("dailyTrades", Value.fromBigInt(value));
  }
}

export class NFT extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("auction", Value.fromString(""));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("updatedAt", Value.fromBigInt(BigInt.zero()));
    this.set("currentAskPrice", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("currentSeller", Value.fromString(""));
    this.set("latestTradedPriceInBNB", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tradeVolumeBNB", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalTrades", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NFT entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type NFT must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("NFT", id.toString(), this);
    }
  }

  static load(id: string): NFT | null {
    return changetype<NFT | null>(store.get("NFT", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get collection(): Array<string> {
    let value = this.get("collection");
    return value!.toStringArray();
  }

  set collection(value: Array<string>) {
    this.set("collection", Value.fromStringArray(value));
  }

  get auction(): string {
    let value = this.get("auction");
    return value!.toString();
  }

  set auction(value: string) {
    this.set("auction", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get url(): string | null {
    let value = this.get("url");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set url(value: string | null) {
    if (!value) {
      this.unset("url");
    } else {
      this.set("url", Value.fromString(<string>value));
    }
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value!.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }

  get currentAskPrice(): BigDecimal {
    let value = this.get("currentAskPrice");
    return value!.toBigDecimal();
  }

  set currentAskPrice(value: BigDecimal) {
    this.set("currentAskPrice", Value.fromBigDecimal(value));
  }

  get currentSeller(): string {
    let value = this.get("currentSeller");
    return value!.toString();
  }

  set currentSeller(value: string) {
    this.set("currentSeller", Value.fromString(value));
  }

  get latestTradedPriceInBNB(): BigDecimal {
    let value = this.get("latestTradedPriceInBNB");
    return value!.toBigDecimal();
  }

  set latestTradedPriceInBNB(value: BigDecimal) {
    this.set("latestTradedPriceInBNB", Value.fromBigDecimal(value));
  }

  get tradeVolumeBNB(): BigDecimal {
    let value = this.get("tradeVolumeBNB");
    return value!.toBigDecimal();
  }

  set tradeVolumeBNB(value: BigDecimal) {
    this.set("tradeVolumeBNB", Value.fromBigDecimal(value));
  }

  get totalTrades(): BigInt {
    let value = this.get("totalTrades");
    return value!.toBigInt();
  }

  set totalTrades(value: BigInt) {
    this.set("totalTrades", Value.fromBigInt(value));
  }

  get transactionHistory(): Array<string> {
    let value = this.get("transactionHistory");
    return value!.toStringArray();
  }

  set transactionHistory(value: Array<string>) {
    this.set("transactionHistory", Value.fromStringArray(value));
  }
}

export class Mint extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("mintaddress", Value.fromBytes(Bytes.empty()));
    this.set("url", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Mint entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Mint must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Mint", id.toString(), this);
    }
  }

  static load(id: string): Mint | null {
    return changetype<Mint | null>(store.get("Mint", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get mintaddress(): Bytes {
    let value = this.get("mintaddress");
    return value!.toBytes();
  }

  set mintaddress(value: Bytes) {
    this.set("mintaddress", Value.fromBytes(value));
  }

  get url(): string {
    let value = this.get("url");
    return value!.toString();
  }

  set url(value: string) {
    this.set("url", Value.fromString(value));
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("block", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("collection", Value.fromString(""));
    this.set("nft", Value.fromString(""));
    this.set("askPrice", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("netPrice", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("buyer", Value.fromString(""));
    this.set("seller", Value.fromString(""));
    this.set("withBNB", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Transaction must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Transaction", id.toString(), this);
    }
  }

  static load(id: string): Transaction | null {
    return changetype<Transaction | null>(store.get("Transaction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get collection(): string {
    let value = this.get("collection");
    return value!.toString();
  }

  set collection(value: string) {
    this.set("collection", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get askPrice(): BigDecimal {
    let value = this.get("askPrice");
    return value!.toBigDecimal();
  }

  set askPrice(value: BigDecimal) {
    this.set("askPrice", Value.fromBigDecimal(value));
  }

  get netPrice(): BigDecimal {
    let value = this.get("netPrice");
    return value!.toBigDecimal();
  }

  set netPrice(value: BigDecimal) {
    this.set("netPrice", Value.fromBigDecimal(value));
  }

  get buyer(): string {
    let value = this.get("buyer");
    return value!.toString();
  }

  set buyer(value: string) {
    this.set("buyer", Value.fromString(value));
  }

  get seller(): string {
    let value = this.get("seller");
    return value!.toString();
  }

  set seller(value: string) {
    this.set("seller", Value.fromString(value));
  }

  get withBNB(): boolean {
    let value = this.get("withBNB");
    return value!.toBoolean();
  }

  set withBNB(value: boolean) {
    this.set("withBNB", Value.fromBoolean(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("numberTokensListed", Value.fromBigInt(BigInt.zero()));
    this.set("numberTokensPurchased", Value.fromBigInt(BigInt.zero()));
    this.set("numberTokensSold", Value.fromBigInt(BigInt.zero()));
    this.set(
      "totalVolumeInBNBTokensPurchased",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "totalVolumeInBNBTokensSold",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "totalFeesCollectedInBNB",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set("askOrderHistory", Value.fromString(""));
    this.set(
      "averageTokenPriceInBNBPurchased",
      Value.fromBigDecimal(BigDecimal.zero())
    );
    this.set(
      "averageTokenPriceInBNBSold",
      Value.fromBigDecimal(BigDecimal.zero())
    );
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get numberTokensListed(): BigInt {
    let value = this.get("numberTokensListed");
    return value!.toBigInt();
  }

  set numberTokensListed(value: BigInt) {
    this.set("numberTokensListed", Value.fromBigInt(value));
  }

  get numberTokensPurchased(): BigInt {
    let value = this.get("numberTokensPurchased");
    return value!.toBigInt();
  }

  set numberTokensPurchased(value: BigInt) {
    this.set("numberTokensPurchased", Value.fromBigInt(value));
  }

  get numberTokensSold(): BigInt {
    let value = this.get("numberTokensSold");
    return value!.toBigInt();
  }

  set numberTokensSold(value: BigInt) {
    this.set("numberTokensSold", Value.fromBigInt(value));
  }

  get totalVolumeInBNBTokensPurchased(): BigDecimal {
    let value = this.get("totalVolumeInBNBTokensPurchased");
    return value!.toBigDecimal();
  }

  set totalVolumeInBNBTokensPurchased(value: BigDecimal) {
    this.set("totalVolumeInBNBTokensPurchased", Value.fromBigDecimal(value));
  }

  get totalVolumeInBNBTokensSold(): BigDecimal {
    let value = this.get("totalVolumeInBNBTokensSold");
    return value!.toBigDecimal();
  }

  set totalVolumeInBNBTokensSold(value: BigDecimal) {
    this.set("totalVolumeInBNBTokensSold", Value.fromBigDecimal(value));
  }

  get totalFeesCollectedInBNB(): BigDecimal {
    let value = this.get("totalFeesCollectedInBNB");
    return value!.toBigDecimal();
  }

  set totalFeesCollectedInBNB(value: BigDecimal) {
    this.set("totalFeesCollectedInBNB", Value.fromBigDecimal(value));
  }

  get buyTradeHistory(): Array<string> {
    let value = this.get("buyTradeHistory");
    return value!.toStringArray();
  }

  set buyTradeHistory(value: Array<string>) {
    this.set("buyTradeHistory", Value.fromStringArray(value));
  }

  get sellTradeHistory(): Array<string> {
    let value = this.get("sellTradeHistory");
    return value!.toStringArray();
  }

  set sellTradeHistory(value: Array<string>) {
    this.set("sellTradeHistory", Value.fromStringArray(value));
  }

  get askOrderHistory(): string {
    let value = this.get("askOrderHistory");
    return value!.toString();
  }

  set askOrderHistory(value: string) {
    this.set("askOrderHistory", Value.fromString(value));
  }

  get averageTokenPriceInBNBPurchased(): BigDecimal {
    let value = this.get("averageTokenPriceInBNBPurchased");
    return value!.toBigDecimal();
  }

  set averageTokenPriceInBNBPurchased(value: BigDecimal) {
    this.set("averageTokenPriceInBNBPurchased", Value.fromBigDecimal(value));
  }

  get averageTokenPriceInBNBSold(): BigDecimal {
    let value = this.get("averageTokenPriceInBNBSold");
    return value!.toBigDecimal();
  }

  set averageTokenPriceInBNBSold(value: BigDecimal) {
    this.set("averageTokenPriceInBNBSold", Value.fromBigDecimal(value));
  }
}