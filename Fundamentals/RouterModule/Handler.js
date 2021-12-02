


let qryString=require('querystring');

const home=(response)=>{
    let htmlContent=`
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

        <title>Home</title>
    </head>
    <body>
        <form>
           <h1>Welcome  to Node Js Server</h1>
           <br />
            <a href="/review">Go to Review</a>

        </form>
    </body>
    </html>
    `;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(htmlContent);
    response.end();
}


const review=(response)=>{
    let htmlContent=`
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

        <title>Review</title>
    </head>
    <body>
        
        <div class="container">
        <h2>Stacked form</h2>
        <form action="/reviewPost" method="post">
        <div class="form-group">
            <label for="text">Username:</label>
            <input type="text" class="form-control" id="Username" placeholder="Enter Username" name="Username">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="Password" placeholder="Enter password" name="Password">
        </div>
        <div class="form-group form-check">
            <label class="form-check-label">
            <input class="form-check-input" type="checkbox" name="remember"> Remember me
            </label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>

    </body>
    </html>
    `;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(htmlContent);
    response.end();
}

const reviewPost=(response,data)=>{    
    console.log('Review Posting to Server')
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    //response.write(`Your review is `+qryString.parse(data).text);
    console.log(data)
    response.write(`Your review is Username: ${data.Username} Password:${data.Password}`);
    response.end();
}


module.exports={
    home:home,
    review:review,
    reviewPost:reviewPost
}