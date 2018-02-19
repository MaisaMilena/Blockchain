// import 
const SHA256 = require('crypto-js/sha256');
const crypto = require('crypto');

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

	// encryptData(data){
	// 	return crypto.createCipher("aes-256-ctr", key).update(data, "utf-8", "hex");
	// }

	decryptData(key){
		return crypto.createDecipher("aes-256-ctr", key).update(this.data, "hex", "utf-8");
	}
}

class Blockchain {
	constructor(){
		// The first element is the genesis, must be added manually
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		return new Block(0, "10/03/2018", "8858cb2e83e47c5ee141e331b2f696e3db3d2b7079a6d645f572810973be81843fcd9aff4a0317593fb7a872e2022803679bd6d9a98583c290b8808a3b175b483f137cbb4f7a8dc94b3f6dbabf9628", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	// verify the current and previous block's hash 
	isChainValid(){
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];
			
			console.log('Hash: '+currentBlock.hash+'previousHash: '+previousBlock.hash);
			// verify if the hash of the current block is valid
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			// check if the current block point to the correct previous block 
			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}

		//the chain is valid
		return true;
	}

}

// Creating the blockchain
let maisaChain = new Blockchain();
maisaChain.addBlock(new Block(1, "10/03/2018", "4ae54f590e0cb41a23a5286470075ba85c80fb3fbb5917457a960579fd425cc1af700ce088be93"));
maisaChain.addBlock(new Block(2, "10/03/2018", "8858cb2e83e47c5ee141e331b2f696e3db3d2b7079a6d645f572810973be81843fcd9aff4a0317593fb7a872e2022803679bd6d9a98583c290b8808a3b175b483f137cbb4f7a8dc94b3f6dbabf9628"));

// Print 
console.log(JSON.stringify(maisaChain, null, 5));


// var key = "";
// // Descrypt the chain
// for (i = 0; i < maisaChain.chain.length; i++) {
// 	var desc = maisaChain.chain[i].decryptData(key);
// 	console.log(desc);
// }



