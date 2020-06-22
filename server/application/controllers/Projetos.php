<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use Doctrine\ORM\Query\ResultSetMapping;

class Projetos extends CI_Controller {
	function __construct(){
		header("Access-Control-Allow-Origin: *");
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
			
		parent::__construct();
	}

	// Exemplificando createNativeQuery
	public function index() {
		$queryParam = $this->input->get('q');

		$rsm = new ResultSetMapping();
		$rsm->addEntityResult('Entity\Projeto', 'p');
		$rsm->addFieldResult('p', 'id', 'id');
		$rsm->addFieldResult('p', 'descricao', 'descricao');

		
		$rawQuery = 'SELECT * FROM projeto where descricao like ?';

		$query = $this->doctrine->em->createNativeQuery($rawQuery, $rsm);
		$queryParamFormatted = "%" . trim($queryParam) . "%";
		$query->setParameter(1, $queryParamFormatted);
		$resultado = $query->getResult();

		echo json_encode($resultado);
	}

	public function create() {
		$request = file_get_contents("php://input");
		$_POST = json_decode($request, true);

		
		$projeto = new Entity\Projeto;
		$projeto->setDescricao($_POST["descricao"]);
		$this->doctrine->em->persist($projeto);
		$this->doctrine->em->flush();

		echo json_encode($projeto);
	}

	public function delete($id) {
		$projeto = $this->doctrine->em->find("Entity\Projeto",$id);
		$this->doctrine->em->remove($projeto);
		$this->doctrine->em->flush();
	}
}
