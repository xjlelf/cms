<?php
App::uses('Mysql', 'Model/Datasource/Database');

/**
 * 自定义的Mysql的子类
 * 
 * @package       Cake.Model.Datasource.Database
 * */
class MyMysql extends Mysql {

	/**
	 * 父类的value的方法的重写，对拼接sql语句的枚举类型的处理的追加
	 * 
	 * @param string $data String to be prepared for use in an SQL statement
     * @param string $column The column datatype into which this data will be inserted.
     * @return string Quoted and escaped data
	 * */
	public function value($data, $column = null) {
		if (is_array($data) && !empty($data)) {
			return array_map(
				array(&$this, 'value'),
				$data, array_fill(0, count($data), $column)
			);
		} elseif (is_object($data) && isset($data->type, $data->value)) {
			if ($data->type === 'identifier') {
				return $this->name($data->value);
			} elseif ($data->type === 'expression') {
				return $data->value;
			}
		} elseif (in_array($data, array('{$__cakeID__$}', '{$__cakeForeignKey__$}'), true)) {
			return $data;
		}

		if ($data === null || (is_array($data) && empty($data))) {
			return 'NULL';
		}

		if (empty($column)) {
			$column = $this->introspectType($data);
		}
		// 增加枚举类型
		if (preg_match('/enum/', $column)) {
			$column = 'enum';
		}

		switch ($column) {
			case 'binary':
				return $this->_connection->quote($data, PDO::PARAM_LOB);
			case 'boolean':
				return $this->_connection->quote($this->boolean($data, true), PDO::PARAM_BOOL);
			case 'string':
			case 'enum':
			case 'text':
				return $this->_connection->quote($data, PDO::PARAM_STR);
			default:
				if ($data === '') {
					return 'NULL';
				}
				if (is_float($data)) {
					return str_replace(',', '.', strval($data));
				}
				if ((is_int($data) || $data === '0') || (
					is_numeric($data) && strpos($data, ',') === false &&
					$data[0] != '0' && strpos($data, 'e') === false)
				) {
					return $data;
				}
				return $this->_connection->quote($data);
		}
	}
}
?>
