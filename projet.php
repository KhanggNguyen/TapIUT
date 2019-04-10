<?php

class Conf {
    
    private static $database = array(
        'hostname' => 'localhost',
        'database' => 'javascript',
        'login'    => 'root',
        'password' => ''
    );

    static public function getLogin() {
        return self::$database['login'];
    }

    static public function getHostname() {
        return self::$database['hostname'];
    }

    static public function getDatabase() {
        return self::$database['database'];
    }

    static public function getPassword() {
        return self::$database['password'];
    }

}

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données            
            // le dernier argument sert à ce que toutes les chaines de charactères 
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    public static function getScore(){
        try{
            $sql = "SELECT * FROM score ORDER BY Score DESC LIMIT 10";
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute();
            $req_prep->setFetchMode();
            $tabResults = $req_prep->fetchAll(PDO::FETCH_ASSOC);
            return $tabResults;
        }catch(PDOException $e){
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function saveScore($name, $score){
        try{
            $sql = "INSERT INTO Score (Id, Nom, Score) VALUES(:id_tag, :name_tag, :score_tag)";
            $values = array(
                "id_tag" => NULL,
                "name_tag" => $name,
                "score_tag" => $score,);
            $req_prep = self::$pdo->prepare($sql);
            return $req_prep->execute($values);
        }catch(PDOException $e){
            echo $e->getMessage();
            die("Erreur lors de l'insertion dans la base de données");
        }
    }
}


// on initialise la connexion $pdo
Model::init_pdo();

//fonction
$tab = Model::getScore();

foreach($tab as $t){
    if($_GET['s'] > $t['Score']){
        Model::saveScore($_GET['n'], $_GET['s']);
        break;
    }
}

$tab_res = Model::getScore();
echo json_encode($tab_res);
