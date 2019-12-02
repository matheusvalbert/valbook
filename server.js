const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let url = mongo "mongodb://localhost:27017/mydb";
var session = require('express-session');
let MONGO_CONFIG = {useUnifiedTopology: true, useNewUrlParser: true};
var sessoes = [];

app.use(session({
	secret: "chave criptográfica",
	secure: false,
	resave: false,
	saveUninitialized: false
	}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('.'));

var texto = "";

app.set('view engine', 'ejs');

app.get('/Postinfo:tag', async function(req, res) {
	var postid = req.params.tag;

	postid = postid.split("-");

	var post = await retornaNumeroDePosts() - ((postid[1] -1) *6) - postid[0];

	var retorna = await RetornaPost(post);

	res.render('VB_Post', {nome: await Retornanome(sessoes[req.sessionID]), 
		titulo: retorna.titulo_post, 
		post: retorna.conteudo_post, 
		autor: retorna.autor_post, 
		data: retorna.data_post,
		postnum: post
	});
});


app.get('/Home:tag', async function(req, res) {

	var opcao = req.params.tag;
	var active = parseInt(opcao);

	var val = (req.params.tag -1)*6;

	var num1 = "", num2 = "", num3 = "", num4 = "", num5 = "", num6 = "", num7 = "", num8 = "", num9 = "", num10 = "";

	switch(parseInt(opcao)) {

		case 1:
			num1 = "active";
			break;
		case 2:
			num2 = "active";
			break;
		case 3:
			num3 = "active";
			break;
		case 4:
			num4 = "active";
			break;
		case 5:
			num5 = "active";
			break;
		case 6:
			num6 = "active";
			break;
		case 7:
			num7 = "active";
			break;
		case 8:
			num8 = "active";
			break;
		case 9:
			num9 = "active";
			break;
		case 10:
			num10 = "active";
			break;
		default:
			num1 = "active";
	}	

	var retorna1 = await RetornaPost(await retornaNumeroDePosts() - val - 1);
	var retorna2 = await RetornaPost(await retornaNumeroDePosts() - val - 2);
	var retorna3 = await RetornaPost(await retornaNumeroDePosts() - val - 3);
	var retorna4 = await RetornaPost(await retornaNumeroDePosts() - val - 4);
	var retorna5 = await RetornaPost(await retornaNumeroDePosts() - val - 5);
	var retorna6 = await RetornaPost(await retornaNumeroDePosts() - val - 6);


	res.render('VB_Home', {nome: await Retornanome(sessoes[req.sessionID]), 
		titulo_post1: retorna1.titulo_post, 
		titulo_post2: retorna2.titulo_post, 
		titulo_post3: retorna3.titulo_post, 
		titulo_post4: retorna4.titulo_post, 
		titulo_post5: retorna5.titulo_post, 
		titulo_post6: retorna6.titulo_post,
		post1: retorna1.conteudo_post, 
		post2: retorna2.conteudo_post, 
		post3: retorna3.conteudo_post, 
		post4: retorna4.conteudo_post, 
		post5: retorna5.conteudo_post, 
		post6: retorna6.conteudo_post,
		autor1: retorna1.autor_post, 
		autor2: retorna2.autor_post, 
		autor3: retorna3.autor_post, 
		autor4: retorna4.autor_post, 
		autor5: retorna5.autor_post, 
		autor6: retorna6.autor_post,
		data1: retorna1.data_post,
		data2: retorna2.data_post, 
		data3: retorna3.data_post, 
		data4: retorna4.data_post, 
		data5: retorna5.data_post, 
		data6: retorna6.data_post,
		activenum01: num1, activenum02: num2, activenum03: num3, activenum04: num4, activenum05: num5,
		activenum06: num6, activenum07: num7, activenum08: num8, activenum09: num9, activenum10: num10,
		activepag: active

	});
});

app.get('/Update', async function(req, res) {
	res.render('VB_Update', {nome: await Retornanome(sessoes[req.sessionID])});
});

app.get('/New_Post', async function(req, res) {
	res.render('VB_NewPost', {nome: await Retornanome(sessoes[req.sessionID])});
});

app.get('/Post', async function(req, res) {
	res.render('VB_Post', {nome: await Retornanome(sessoes[req.sessionID])});
});

app.get('/', async function(req, res) {
	if(sessoes[req.sessionID]!=null)
	{
	var retorna1 = await RetornaPost(await retornaNumeroDePosts() - 1);
	var retorna2 = await RetornaPost(await retornaNumeroDePosts() - 2);
	var retorna3 = await RetornaPost(await retornaNumeroDePosts() - 3);
	var retorna4 = await RetornaPost(await retornaNumeroDePosts() - 4);
	var retorna5 = await RetornaPost(await retornaNumeroDePosts() - 5);
	var retorna6 = await RetornaPost(await retornaNumeroDePosts() - 6);

	res.render('VB_Home', {nome: await Retornanome(sessoes[req.sessionID]), 
		titulo_post1: retorna1.titulo_post, 
		titulo_post2: retorna2.titulo_post, 
		titulo_post3: retorna3.titulo_post, 
		titulo_post4: retorna4.titulo_post, 
		titulo_post5: retorna5.titulo_post, 
		titulo_post6: retorna6.titulo_post,
		post1: retorna1.conteudo_post, 
		post2: retorna2.conteudo_post, 
		post3: retorna3.conteudo_post, 
		post4: retorna4.conteudo_post, 
		post5: retorna5.conteudo_post, 
		post6: retorna6.conteudo_post,
		autor1: retorna1.autor_post, 
		autor2: retorna2.autor_post, 
		autor3: retorna3.autor_post, 
		autor4: retorna4.autor_post, 
		autor5: retorna5.autor_post, 
		autor6: retorna6.autor_post,
		data1: retorna1.data_post,
		data2: retorna2.data_post, 
		data3: retorna3.data_post, 
		data4: retorna4.data_post, 
		data5: retorna5.data_post, 
		data6: retorna6.data_post,
		activenum01: "active", activenum02: "", activenum03: "", activenum04: "", activenum05: "",
		activenum06: "", activenum07: "", activenum08: "", activenum09: "", activenum10: "",
		activepag: 1

	});
	}
	else
		res.sendFile(__dirname + '/VB_Inicio.html');
});

app.get('/getLogged', function(req, res) {

	if(sessoes[req.sessionID]!=null)
	{
		res.send("Logado");
	}
	else
		res.send("Não logado");
});

app.post('/LogarUsuario', async function(req, res) {
	var email = req.body.email;
	var senha = req.body.senha;
	if(await checarSenha(email,senha) == 1) {
		req.session.views = 1;
		sessoes[req.sessionID] = req.body.email;
		res.end("Usuario logado com sucesso");
	}
	else
		res.end("Nome ou senha errados");
});

app.get('/SairUsuario', function(req, res) {

		req.session.destroy(function() {
		delete sessoes[req.sessionID];
	});
	res.sendFile(__dirname + '/VB_Inicio.html');
});

app.post('/SendComment', async function(req, res) {
	var comentario = req.body.comment;
	var postnum = req.body.postnum;
	var nome = await Retornanome(sessoes[req.sessionID]);
	var retorna = await RetornaPost(parseInt(postnum));
	var allcomments;
	if(retorna.comments == "Nenhum comentário ainda inserido")
	{
		allcomments = nome + ": " + comentario;
	}
	else
	{
		allcomments =nome + ": " + comentario+"\n"+ retorna.comments;
	}
	await updateComentarios(postnum,allcomments)	
});

app.get('/getComments:tag', async function(req, res) {
	var postnum = req.params.tag;
	var retorna = await RetornaPost(parseInt(postnum));
	res.end(retorna.comments);	
});

function updateComentarios(postnum,comentario) {
return new Promise((resolve) => {

	MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
		if (err) 
			throw err;
		var dbo = db.db("mydb");
		dbo.collection("postagens").updateOne({_id:parseInt(postnum)},{$set: {"comments":comentario}},function(err, result) {
		if (err) 
			throw err;
		if(result)
			resolve(1);
		else
			resolve(0);
});
		db.close();
});
});
}

app.post('/UpdateInfo', async function(req, res) {
	var flag1 = 0, flag2 = 0, flag3 = 0;
	var nome = req.body.nome;
	var pais = req.body.pais;
	var senha1 = req.body.senha1;
	var senha2 = req.body.senha2;
	var letters = /^[A-Z a-z]+$/;
	if(nome.length>1)
	{
		if(nome.match(letters)==null)
		{
			res.end("Nomes não possuem numeros");
			return -1;
		}
		flag1 = 1;
	}
	if(pais.length>1)
	{
		if(pais.match(letters)==null)
		{
			res.end("Paises não possuem numeros");
			return -1;
		}
		flag2 = 1;
	}
	if(senha1.length>1 && senha2.length>1)
	{
		if(senha1.length <8 || senha2.length < 8)
		{
			res.end("Senha menor do que 8 caracteres");
			return -1;
		}

		if(senha1 != senha2)
		{
			res.end("As senhas digitadas não são iguais");
		}
		flag3 = 1;
	}	
	if(flag1==1)
	{
		await atualizarNome(nome,sessoes[req.sessionID]);
		await atualizarNomePostagens(nome,sessoes[req.sessionID]);
	}
	if(flag2 == 1)
	{
		await atualizarPais(pais,sessoes[req.sessionID]);
	}
	if(flag3 == 1)
	{
		await atualizarSenha(senha1,sessoes[req.sessionID]);
	}
	res.end("Dados atualizados com sucesso.");
		
});

function atualizarNomePostagens(nome,email) {
return new Promise((resolve) => {

	MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
		if (err) 
			throw err;
		var dbo = db.db("mydb");
		dbo.collection("postagens").updateMany({email:email},{$set: {"autor_post":nome}},function(err, result) {
		if (err) 
			throw err;
		if(result)
			resolve(1);
		else
			resolve(0);
});
		db.close();
});
});
}

function atualizarSenha(senha,email) {
return new Promise((resolve) => {

	MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
		if (err) 
			throw err;
		var dbo = db.db("mydb");
		dbo.collection("usuarios").updateMany({email:email},{$set: {"senha":senha}},function(err, result) {
		if (err) 
			throw err;
		if(result)
			resolve(1);
		else
			resolve(0);
});
		db.close();
});
});
}

function atualizarPais(pais,email) {
return new Promise((resolve) => {

	MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
		if (err) 
			throw err;RetornaPost
		var dbo = db.db("mydb");
		dbo.collection("usuarios").updateMany({email:email},{$set: {"pais":pais}},function(err, result) {
		if (err) 
			throw err;
		if(result)
			resolve(1);
		else
			resolve(0);
});
		db.close();
});
});
}

function atualizarNome(nome,email) {
return new Promise((resolve) => {

	MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
		if (err) 
			throw err;
		var dbo = db.db("mydb");
		dbo.collection("usuarios").updateMany({email:email},{$set: {"nome":nome}},function(err, result) {
		if (err) 
			throw err;
		if(result)
			resolve(1);
		else
			resolve(0);
});
		db.close();
});
});
}


function checarSenha(email,senha) {
	return new Promise((resolve) => {
	
		MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
			if (err) 
				throw err;
			var dbo = db.db("mydb");
			dbo.collection("usuarios").findOne({email:email,senha: senha},function(err, result) {
			if (err) 
				throw err;
			if(result)
				resolve(1);
			else
				resolve(0);
	});
			db.close();
	});
	});
	}

app.post('/CadastrarUsuario', async function(req, res) {
	var nome = req.body.nome;
	var pais = req.body.pais;
	var nascimento = req.body.nascimento;
	var email = req.body.email;
	var senha1 = req.body.senha1;
	var senha2 = req.body.senha2;
	var check = req.body.check;
	var ano;
	var letters = /^[A-Z a-z]+$/;

	if(senha1 == undefined)
	{
		res.end("Senha indefinida");
		return -1;
	}
	if(senha1.length <8 || senha2.length < 8)
	{
		res.end("Senha menor do que 8 caracteres");
		return -1;
	}

	if(senha1 != senha2)
	{
		res.end("As senhas digitadas não são iguais");
	}
	if(check === "off")
	{
		res.end("Assinale os termos");
		return -1;
	}
	if(nome === undefined || pais === undefined || nascimento === undefined || email === undefined)
	{
		res.end("Preencha todos os campos");
		return -1;
	}
	if(nome.length < 1 || pais.length < 1 || nascimento.length < 1 || email.length < 1)
	{
		res.end("Preencha todos os campos");
		return -1;
	}
	if(nascimento.length != 10)
	{
		res.end("Data de nascimento em formato inadequado");
		return -1;
	}
	ano = nascimento.slice(0,4);
	var data = new Date();
	if(ano >  data.getFullYear())
	{
		res.end("Ano invalido");
		return -1;
	}
	if(data.getFullYear() - ano < 18)
	{
		res.end("O site é permitido apenas para maiores de 18 anos");
		return -1;
	}
	if(ano < 1900)
	{
		res.end("Voce tem certeza da sua idade?");
		return -1;
	}
	if(nome.match(letters)==null)
	{
		res.end("Nomes não possuem numeros");
		return -1;
	}
	if(pais.match(letters)==null)
	{
		res.end("Paises não possuem numeros");
		return -1;
	}
	if(email.indexOf("@")==-1)
	{
		res.end("Email incorreto");
		return -1;
	}
	if( email.lastIndexOf("@") != email.indexOf("@"))
	{
		res.end("Email incorreto");
		return -1;
	}
	
	if(await operacaoAssincrona(email) == 0) {

		MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
		if (err) 
			throw err;
		var dbo = db.db("mydb");
		dbo.collection("usuarios").insertOne({nome:nome,pais: pais, nascimento: nascimento,email: email, senha: senha1}, function(err, result) {
			if (err) 
				throw err;
		}
		);
		db.close();
		});
		res.end("Usuario criado com sucesso");
	}
	else
		res.end("Email ja utilizado");
	
});

app.post('/Postar', async function(req, res) {
	var titulo_post = req.body.titulo_post;
	var conteudo_post = req.body.conteudo_post;
	var autor_post = await Retornanome(sessoes[req.sessionID]);
	var _id = await retornaNumeroDePosts();
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = dd + '/' + mm + '/' + yyyy;
	if(titulo_post == undefined)
	{
		res.end("É necessário colocar um título na publicação.");
		return -1;
	}
	else
	{
		if(await operacaoAssincronaPost(titulo_post) == 0) {

			MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
			if (err) 
				throw err;
			var dbo = db.db("mydb");
			dbo.collection("postagens").insertOne({_id: _id, autor_post: autor_post, titulo_post: titulo_post, conteudo_post: conteudo_post, data_post: today, email:sessoes[req.sessionID],comments: ""}, function(err, result) {
				if (err) 
					throw err;
			}
			);
			db.close();
			});
			res.end("Postagem realizado com sucesso.")
		}
		else
			res.end("Já existe uma postagem com o mesmo título.");
	}
});

var flag;

function Retornanome(email) {
return new Promise((resolve) => {

	MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
		if (err) 
			throw err;
		var dbo = db.db("mydb");
		dbo.collection("usuarios").findOne({email:email},function(err, result) {
		if (err) 
			throw err;
		if(result)
			resolve(result.nome);
		else
			resolve(0);
});
		db.close();
});
});
}

function retornaNumeroDePosts() {
return new Promise((resolve) => {

	MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
		if (err) 
			throw err;
		var dbo = db.db("mydb");
		dbo.collection("postagens").countDocuments(function(err, result) {
		if (err) 
			throw err;
		if(result)
			resolve(result);
		else
			resolve(0);
});
		db.close();
});
});
}

function operacaoAssincrona(email) {
return new Promise((resolve) => {

	MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
		if (err) 
			throw err;
		var dbo = db.db("mydb");
		dbo.collection("usuarios").findOne({email:email},function(err, result) {
		if (err) 
			throw err;
		if(result)
			resolve(1);
		else
			resolve(0);
});
		db.close();
});
});
}

function operacaoAssincronaPost(titulo_post) {
	return new Promise((resolve) => {
	
		MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
			if (err) 
				throw err;
			var dbo = db.db("mydb");
			dbo.collection("postagens").findOne({titulo_post:titulo_post},function(err, result) {
			if (err) 
				throw err;
			if(result)
				resolve(1);
			else
				resolve(0);
	});
			db.close();
	});
	});
	}

function RetornaPost(_id) {
return new Promise((resolve) => {

	MongoClient.connect(url, MONGO_CONFIG, function(err, db) {
		if (err) 
			throw err;
		var dbo = db.db("mydb");
		dbo.collection("postagens").findOne({_id:_id},function(err, result) {
		if (err) 
			throw err;
		if(result)
			resolve(result);
		else
			resolve("");
});
		db.close();
});
});
	}

app.listen(8080);
