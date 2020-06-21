<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// Rota principal
$route['default_controller'] = 'projetos/index';

// Rotas da entidade Projeto
$route['projetos']['post'] = 'projetos/create';
$route['projetos']['get'] = 'projetos/index';
$route['projetos/(:num)']['get'] = 'projetos/get/$1';
$route['projetos/(:num)']['delete'] = 'projetos/delete/$1';
$route['projetos/(:num)/atividades']['get'] = 'atividades/projeto/$1';

// Rotas da entidade Atividade
$route['atividades/(:num)'] = 'atividades/get/$1';

// Rota para popular dados
$route['principal/povoar'] = 'principal/povoar';

$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
