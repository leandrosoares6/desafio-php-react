<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

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
		$data = [];
		$atividades = $this->doctrine->em->getRepository("Entity\Atividade")
									 ->findBy(array("idProjeto"=>$id),array("dataCadastro"=>"asc"));	
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
			$request = file_get_contents("php://input");
			$_POST = json_decode($request, true);
	
			$atividade = new Entity\Atividade;
			$projeto = $this->doctrine->em->find("Entity\Projeto",(int) $_POST["idProjeto"]);

			$atividade->setIdProjeto($projeto);
			$atividade->setDescricao($_POST["descricao"]);
			$atividade->setDataCadastro(date("Y-m-d H:i:s"));
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
