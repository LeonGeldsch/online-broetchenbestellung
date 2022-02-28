<?php

namespace WBD5204\Model;

use WBD5204\Model as AbstractModel;

final class OrderItems extends AbstractModel {

    public function createOrderItems( array &$errors, int $order_id, array &$order_items ) : bool {

        /** @var array $order_items */
        $order_items = json_decode( filter_input( INPUT_POST, 'order_items'), TRUE );

        /** @var bool $validate_order_items */
        $validate_order_items = TRUE;//$this->validateOrderItems( $errors, $order_items );

        if ( $validate_order_items ) {

            $success = TRUE;

            foreach( $order_items as &$order_item ) {

                /** @var string $query */
                $query = 'INSERT INTO order_items ( product_id, order_id, amount ) VALUES ( :product_id, :order_id, :amount );';
    
                /** @var \PDOStatement $statement */
                $statement = $this->Database->prepare( $query );
                $statement->bindValue( ':product_id', $order_item[ 'product_id' ] );
                $statement->bindValue( ':order_id', $order_id );
                $statement->bindValue( ':amount', $order_item[ 'amount' ] );
                $statement->execute();

                $order_item[ 'id' ] = $this->Database->lastInsertId();

                $success = $success && ( $statement->rowCount() > 0 );
            }

            return $success;
        }
        else {

            return FALSE;
        }
    }

    public function deleteOrderItems( array &$errors, ?string $order_id ) : bool {
        
        /** @var bool $validate_order_id */
        $validate_order_id = TRUE;//$this->validatePostId( $errors, $post_id );

        if ( $validate_order_id ) {
            /** @var string $query */
            $query = 'DELETE FROM order_items WHERE order_id = :order_id;';

            /** @var \PDOStatement $statement */
            $statement = $this->Database->prepare( $query );
            $statement->bindValue( ':order_id', $order_id );
            $statement->execute();

            return TRUE;
        }
        else {

            return FALSE;
        }
    }

    public function getOrderItems( array &$errors, array &$orders ) {

        foreach ( $orders as $index => $order ) {

            /** @var string $query */
            $query = 'SELECT order_items.id, products.name, order_items.amount 
                      FROM order_items 
                      JOIN products 
                      ON order_items.product_id = products.id
                      WHERE order_items.order_id = :order_id;';

            /** @var \PDOStatement $statement */
            $statement = $this->Database->prepare( $query );
            $statement->bindValue( ':order_id', $order[ 'id' ] );
            $statement->execute();

            $orders[ $index ][ 'items' ][] = $statement->fetchAll();

        }
        return TRUE;
    }

    public function updateOrderItem() {
        
    }
}