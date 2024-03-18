<?php

require_once('fonctionsDB.php');


$payload_requete = file_get_contents('php://input');
$data_requete = json_decode($payload_requete, true);

// Vérifier si une action a été spécifiée dans les données de la requête
if (isset($data_requete['action'])) {

    // Switch en fonction de l'action spécifiée
    switch ($data_requete['action']) {

        case 'getTache':
            
            if (isset($data_requete['tache'])) {
                
                $id_tache = htmlspecialchars($data_requete['tache']['id']);

                
                $tache = getTache($id_tache);

                // Vérifier si la tâche a été trouvée
                if ($tache) {
                    // Retourner les détails de la tâche en JSON
                    echo json_encode($tache);
                } else {
                    echo json_encode(array('error' => 'Tâche non trouvée'));
                }
            } else {
                echo json_encode(array('error' => 'Erreur dans la chaîne de requête'));
            }
            break;

        case 'ajouteTache':
            // Vérifier si les données de la tâche sont présentes dans la requête
            if (isset($data_requete['tache'], $data_requete['tache']['tache'], $data_requete['tache']['description'], $data_requete['tache']['importance'])) {
                // Extraire les données de la tâche de la requête
                $tache = htmlspecialchars($data_requete['tache']['tache']);
                $description = htmlspecialchars($data_requete['tache']['description']);
                $importance = htmlspecialchars($data_requete['tache']['importance']);

                // Appeler la fonction pour ajouter une tâche et obtenir le résultat
                $resultat = ajouteTache($tache, $description, $importance);


                if ($resultat) {
                    $data_reponse = array(
                        'id' => $resultat,
                        'tache' => $tache,
                        'description' => $description,
                        'importance' => $importance
                    );
                    echo json_encode($data_reponse); // Retourner les détails de la tâche ajoutée en JSON
                } else {
                    echo json_encode(array('error' => 'Erreur lors de l\'ajout de la tâche'));
                }
            } else {
                echo json_encode(array('error' => 'Erreur dans la chaîne de requête'));
            }
            break;

        case 'supprimeTache':
            // Vérifier si l'ID de la tâche à supprimer est présent dans la requête
            if (isset($data_requete['tache']['idTache'])) {
                echo supprimeTache($data_requete['tache']['idTache']);
            } else {
                echo json_encode(array('error' => 'Erreur dans la chaîne de requête'));
            }
            break;

        case 'trierTache':
            
            $taches_triees = trierPartache();


           
            echo $taches_triees;

            break;

        case 'trierImportance':
       
            $taches_triees = trierParImportance();


            echo $taches_triees;

            break;
    }
} else {
    echo 'Erreur dans l\'action';
}
