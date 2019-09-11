const csv = require("csv-parser")
const {exec} = require("child_process")
const fs = require("fs")
const {task} = require("./schema")


const countrows = (file)=>{
	return new Promise((resolve,reject)=>{
		exec(`cat ${file} | wc -l`,(err,stdout,stderr)=>{
			if(err)
				reject(err)
			resolve(stdout)
            
		})
	})
}

const doTask = (file)=>{
	return new Promise((resolve,reject)=>{
		let i =1
		fs.createReadStream(file)
			.pipe(csv())
			.on("data",(row)=>{
				console.log(`row ${i++}`)
				
			})
			.on("end",()=>{
				console.log("task done successfully")
				return resolve()

			})
			.on("error",(err)=>{
				return reject(err)
			})
	})
	
}


module.exports = {
	doTask,
	countrows
}