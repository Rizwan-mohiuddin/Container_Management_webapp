const express = require("express")
const app = express()

const {exec} = require("child_process")

app.get("/runform" , (request, respond) => {
             
		res.sendFile( __dirname + "/rundocker.html") ;
})

app.get("/run" , (req, res) => {
		const containerName = req.query.containerName ; 
		const containerImage = req.query.containerImage ; 

		exec("docker run -dit --name " + containerName + " " + containerImage , (err, stdout, stderr) => {
		console.log(stdout);
		res.send("<pre> Launched Successfullly!!!" + stdout + "</pre>") ;
		})
})

app.get("/ps" , (req, resp) => {
		exec("docker ps | tail -n +2", (err, stdout, stderr) => {
		
			let a = stdout.split("\n");
			res.write("<table border='5' align='center' width='80%'>");
			res.write("<tr><th>Container id</th><th>Image Name</th><th>Command</th><th>Container Name</th></tr>"};
			a.forEach( ( cdetails ) => { 
				cinfo = cdetails.trim().split(/\s+/)[1]
				console.log(cinfo[0] + " " + cinfo[1] + " " + cinfo[2])
				res.write("<tr>" + "<td>" + cinfo[0] + "</td>" + "<td>" + cinfo[1] + "</td>" + "<td>" + cinfo[2] + "</td>" + 
					"<td>" + cinfo[ cinfo.length - 1 ] + "</td>" + "</tr>")
			 })
			res.write("</table>")
				res.send()
		})
})

app.get("/del" , (req, resp) => {
		const Delcontainer = req.query.Delcontainer;

		exec("docker rm " + Delcontainer , (err,stdout,stderr) => {
		console.log(stdout);
		res.send("<pre> Removed Container!!!" + Delcontainer + "</pre>");
		})
})

app.get("/stop" , (req, resp) => {
		const Stcontainer = req.query.Stcontainer;

		exec("docker stop " + Stcontainer , (err,stdout,stderr) => {
		console.log(stdout);
		res.send("<pre> Container Stopped!!!" + Stcontainer + "</pre>");
		})
})

app.get("/start" , (req, resp) => {
		const Startcontainer = req.query.Startcontainer;

		exec("docker start " + Startcontainer , (err,stdout,stderr) => {
		console.log(stdout);
		res.send("<pre> Container Started!!!" + Startcontainer + "</pre>");
		})
})

app.listen(3000, () => { console.log("container management app started") } 

