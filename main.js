// import 
const SHA256 = require('crypto-js/sha256');
const AES = require('crypto-js/aes');

// structure 
class Block {
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = this.encryptData();
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}
	/* 
	Take the properties of the block, run it throght a hash function and return the hash
	*/
	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}

	encryptData(){
		return AES.AES.encrypt(this.data, 'key');
	}

	decryptData(key){
		var bytes  = AES.AES.decrypt(this.data, key);
		var plaintext = bytes.toString(AES.enc.Utf8);
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

// main 
let maisaChain = new Blockchain();
maisaChain.addBlock(new Block(1, "19/12/2017", "testing"));
maisaChain.addBlock(new Block(2, "19/12/2017", "testing second block"));
maisaChain.addBlock(new Block(3, "19/12/2017", "testing third block"));

console.log('Is blockchain valid? ' + maisaChain.isChainValid());

maisaChain.chain[1].data =  "changing the kiii";
maisaChain.chain[1].hash = maisaChain.chain[1].calculateHash();

//console.log(JSON.stringify(maisaChain, null, 5));

console.log('Is blockchain valid? ' + maisaChain.isChainValid());



