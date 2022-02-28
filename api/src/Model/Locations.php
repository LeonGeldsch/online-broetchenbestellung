<?php

namespace WBD5204\Model;

use WBD5204\Model as AbstractModel;

final class Locations extends AbstractModel {

    public function getLocations( array &$errors, array &$results ) : bool {
        /** @var string $query */
        $query = 'SELECT locations.id, locations.coordinates, 
                        locations.name as branch_name, 
                        bakeries.name as bakery_name, 
                        images.thumbnail_src,
                        images.image_src,
                        bakeries.slug
                        FROM locations
                        JOIN bakeries
                        ON bakeries.id = locations.bakery_id
                        JOIN images
                        ON  images.id = bakeries.image_id;';

        /** @var \PDOStatement $statement */
        $statement = $this->Database->prepare( $query );
        $statement->execute();

        $results = $statement->fetchAll();

        return count( $results ) > 0;
    }

}