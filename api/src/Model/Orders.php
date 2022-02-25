<?php

namespace WBD5204\Model;

use WBD5204\Model as AbstractModel;

final class Orders extends AbstractModel {

    public function createOrder( array &$errors, int $user_id, ?int &$order_id ) : bool {

        /** @var int $pickup_time */
        $input_pickup_time = filter_input( INPUT_POST, 'pickup_time' );
        /** @var int $bakery_id */
        $input_bakery_id = filter_input( INPUT_POST, 'bakery_id' );
        /** @var string $status */
        $status = 'received';
        /** @var int $timestamp */
        $timestamp = self::createCurrentTimestamp();

        /** @var bool $validate_pickup_time */
        $validate_pickup_time = TRUE;//$this->validatePickupTime( $errors, $pickup_time );
        /** @var bool $validate_content */
        $validate_bakery_id = TRUE;//$this->validateBakeryId( $errors, $bakery_id );

        if ( $validate_pickup_time && $validate_bakery_id ) {
            /** @var string $query */
            $query = 'INSERT INTO orders ( user_id, status, timestamp, bakery_id, pickup_time ) VALUES ( :user_id, :status, :timestamp, :bakery_id, :pickup_time );';

            /** @var \PDOStatement $statement */
            $statement = $this->Database->prepare( $query );
            $statement->bindValue( ':user_id', $user_id );
            $statement->bindValue( ':status', $status );
            $statement->bindValue( ':timestamp', $timestamp );
            $statement->bindValue( ':bakery_id', $input_bakery_id );
            $statement->bindValue( ':pickup_time', $input_pickup_time );
            $statement->execute();

            $order_id = $this->Database->lastInsertId();

            return $statement->rowCount() > 0;
        }
        else {

            return FALSE;
        }
    }

    public function deleteOrder( array &$errors, ?string $order_id ) : bool {

        /** @var bool $validate_order_id */
        $validate_order_id = TRUE;//$this->validatePostId( $errors, $post_id );

        if ( $validate_order_id ) {
            /** @var string $query */
            $query = 'DELETE FROM orders WHERE id = :id;';

            /** @var \PDOStatement $statement */
            $statement = $this->Database->prepare( $query );
            $statement->bindValue( ':id', $order_id );
            $statement->execute();

            return $statement->rowCount() > 0;
        }
        else {

            return FALSE;
        }
    }

    public function getOrders( array &$errors, array &$results, ?int &$user_id ) : bool {
        /** @var string $query */
        $query = 'SELECT id, status, timestamp, bakery_id, pickup_time FROM orders WHERE user_id = :user_id;';

        /** @var \PDOStatement $statement */
        $statement = $this->Database->prepare( $query );
        $statement->bindValue( ':user_id', $user_id );
        $statement->execute();

        $results = $statement->fetchAll();

        return count( $results ) > 0;
    }

    public function updateOrder() {

    }

    private static function createCurrentTimestamp() : int {

        return ( new \DateTimeImmutable() )->getTimestamp();
    }

    

}