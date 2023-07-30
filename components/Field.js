const Field = () => {
    const generateGrid = (cols, rows) => {
        let grid = [];

        for (let i = 0; i < cols; i++) {
            grid.push([]);

            for (let j = 0; j < rows; j++) {
                grid[i].push({
                    x: i * 50,
                    y: j * 50,
                    hasFood: false,
                    hasSnake: false
                });
            }
        }

        return grid;
    };

    const grid = generateGrid(14, 7);

    return (
        <div className="field">
            {grid.map(col => {
                return col.map(square => {
                    return (
                        <div
                            style={{
                                border: '1px solid #ffffff',
                                height: '50px',
                                width: '50px',
                                position: 'absolute',
                                top: square.y,
                                left: square.x
                            }}></div>
                    );
                });
            })}
        </div>
    );
};

export default Field;
