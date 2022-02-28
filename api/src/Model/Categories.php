<?php

namespace WBD5204\Model;

use WBD5204\Model as AbstractModel;

final class Categories extends AbstractModel {

    public function getCategories( array &$errors, array &$results, int $bakery_id ) : bool {
        /** @var string $query */
        $query = 'SELECT categories.id, categories.name, images.image_src 
                  FROM categories
                  JOIN images ON images.id = categories.image_id
                  WHERE categories.bakery_id = :bakery_id;';

        /** @var \PDOStatement $statement */
        $statement = $this->Database->prepare( $query );
        $statement->bindValue( ':bakery_id', $bakery_id );
        $statement->execute();

        $results = $statement->fetchAll();

        return count( $results ) > 0;
    }

}