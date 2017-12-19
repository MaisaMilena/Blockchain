// import 
const SHA256 = require('crypto-js/sha256');

// structure 
class Block {
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}
	/* 
	Take the properties of the block, run it throght a hash function and return the hash
	*/
	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class Blockchain {
	constructor(){
		// The first element is the genesis, must be added manually
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		return new Block(0, "19/12/2017", "Hi", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

// main 
let maisaChain = new Blockchain();
maisaChain.addBlock(new Block(1, "19/12/2017", "testing"));
maisaChain.addBlock(new Block(2, "19/12/2017", "testing second block"));
maisaChain.addBlock(new Block(3, "19/12/2017", "testing third block"));


console.log(JSON.stringify(maisaChain, null, 4));







