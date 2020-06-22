<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Projetos extends CI_Controller {
	function __construct(){
		header("Access-Control-Allow-Origin: *");
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
			
		parent::__construct();
	}

	public function index() {
		$q = $this->input->get('q');
		$projetos = $this->doctrine->em->getRepository("Entity\Projeto")->findAll();
		echo json_encode($projetos);
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
