pragma solidity ^0.5.0;

contract RobotMonitor {
    // Constants
    uint256 constant MAX = 6;
    uint256 constant MIN = 1;

    // State attributes
    uint256 public row;
    uint256 public col;
    Move public move;

    // Move enum
    enum Move {NONE, LEFT, RIGHT, UP, DOWN}

    
    constructor() public {
    row = 1;
    col = 1;
    move = Move.NONE;
    }


    function getCol() external view returns (uint256) {
        return col;
    }

    function getRow() external view returns (uint256) {
        return row;
    }

    function getMove() external view returns (Move) {
        return move;
    }

    function moveRight() external {
        require(col < MAX && move != Move.LEFT, "Precondition broken");
        col++;
        move = Move.RIGHT;
    }

    function moveLeft() external {
        require(col > MIN && move != Move.RIGHT, "Precondition broken");
        col--;
        move = Move.LEFT;
    }

    function moveUp() external {
        require(row > MIN && move != Move.DOWN, "Precondition broken");
        row--;
        move = Move.UP;
    }

    function moveDown() external {
        require(row < MAX && move != Move.UP, "Precondition broken");
        row++;
        move = Move.DOWN;
    }

    function exit() external {
        require(row == MAX && col == MAX, "Precondition broken");
        row = 1;
        col = 1;
        move = Move.NONE;
    }
}
