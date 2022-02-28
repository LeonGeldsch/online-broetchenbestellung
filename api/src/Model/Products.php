<?php

namespace WBD5204\Model;

use WBD5204\Model as AbstractModel;

final class Products extends AbstractModel {

    public function getProducts( array &$errors, array &$results, int $bakery_id ) : bool {
        /** @var string $query */
        $query = 'SELECT products.id, products.name, products.price, products.description, 
                  images.image_src, images.thumbnail_src, categories.name
                  FROM products
                  JOIN categories ON categories.id = products.category_id
                  JOIN images ON images.id = products.image_id
                  WHERE products.bakery_id = :bakery_id;';

        /** @var \PDOStatement $statement */
        $statement = $this->Database->prepare( $query );
        $statement->bindValue( ':bakery_id', $bakery_id );
        $statement->execute();

        $results = $statement->fetchAll();

        return count( $results ) > 0;
    }

}