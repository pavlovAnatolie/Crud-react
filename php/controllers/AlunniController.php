<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function single(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni where id=".$args["id"]);
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function addUser(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $newData = json_decode($request->getBody(),true);
    $nome= $newData["nome"];
    $cognome= $newData["cognome"];
    
    $result = $mysqli_connection->query("INSERT INTO alunni(nome,cognome) VALUES('$nome','$cognome')");


    $response->getBody()->write(json_encode($newData));
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }

  public function updateUser(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $newData = json_decode($request->getBody(),true);
    $newNome= $newData["nome"];
    $newCognome= $newData["cognome"];

    $id = $args["id"];
    
    $result = $mysqli_connection->query("UPDATE alunni set nome='$newNome', cognome='$newCognome' where id=$id");


    $response->getBody()->write(json_encode($newData));
    return $response->withHeader("Content-type", "application/json")->withStatus(204);
  }

  public function deleteUser(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');

    $id = $args["id"];
    
    $result = $mysqli_connection->query("DELETE from alunni where id=$id");


    return $response->withStatus(200);

  }
}