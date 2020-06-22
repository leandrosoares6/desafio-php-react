<?php

use Doctrine\ORM\Query\ResultSetMapping;

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Atividades extends CI_Controller{
	function __construct(){
		parent::__construct();
		header("Access-Control-Allow-Origin: *");
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
		header('Content-Type: application/json');
	}
	
	public function projeto($id){
		$queryParam = $this->input->get('q');
		$data = [];

		$rsm = new ResultSetMapping();
		$rsm->addEntityResult('Entity\Atividade', 'a');
		$rsm->addFieldResult('a', 'id', 'id');
		$rsm->addFieldResult('a', 'descricao', 'descricao');

		$rawQuery = 'SELECT * FROM atividade where idProjeto = ? and descricao like ?';

		$query = $this->doctrine->em->createNativeQuery($rawQuery, $rsm);
		$queryParamFormatted = "%" . trim($queryParam) . "%";
		$query->setParameter(1, $id);
		$query->setParameter(2, $queryParamFormatted);
		$atividades = $query->getResult();

		foreach($atividades as $atividade){
			$data[] = [
				"id"=>$atividade->getId(),
				"data"=>$atividade->getDataCadastro(),
				"descricao"=>$atividade->getDescricao()
			];
		}				 			
		echo json_encode($data);
    }

    public function get($id){
		$data = [];
		$atividade = $this->doctrine->em->find("Entity\Atividade",$id);
		$data[] = [
            "id"=>$atividade->getId(),
            "data"=>$atividade->getDataCadastro(),
            "descricao"=>$atividade->getDescricao()
        ];			 			
		echo json_encode($data);
    }
		
		public function create() {
			$requisicao = file_get_contents("php://input");
			$_POST = json_decode($requisicao, true);
	
			$atividade = new Entity\Atividade;
			$projeto = $this->doctrine->em->find("Entity\Projeto",(int) $_POST["idProjeto"]);

			$atividade->setIdProjeto($projeto);
			$atividade->setDescricao($_POST["descricao"]);
			$atividade->setDataCadastro(date("Y-m-d H:i:s"));
			$this->doctrine->em->persist($atividade);
			$this->doctrine->em->flush();
	
			echo json_encode($atividade);
		}
	
		public function update($id) {
			$requisicao = file_get_contents("php://input");
			$_PUT = json_decode($requisicao, true);

			$atividade = $this->doctrine->em->find("Entity\Atividade",$id);
			$atividade->setDescricao($_PUT["descricao"]);
			$this->doctrine->em->persist($atividade);
			$this->doctrine->em->flush();

			echo json_encode($atividade);
		}

		public function delete($id) {
			$atividade = $this->doctrine->em->find("Entity\Atividade",$id);
			$this->doctrine->em->remove($atividade);
			$this->doctrine->em->flush();
		}
}
