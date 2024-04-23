<?php
use Slim\Factory\AppFactory;
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/AlunniController.php';

$app = AppFactory::create();

$app->get('/alunni', "AlunniController:index");

$app->get('/alunni/{id}', "AlunniController:single");

$app->post('/alunni', "AlunniController:addUser");

$app->put('/alunni/{id}', "AlunniController:updateUser");

$app->delete('/alunni/{id}', "AlunniController:deleteUser");


$app->run();