/**
 * The while loop represents the game.
 * Each iteration represents a turn of the game
 * where you are given inputs (the heights of the mountains)
 * and where you have to print an output (the index of the mountain to fire on)
 * The inputs you are given are automatically updated according to your last actions.
 **/


// game loop
while (true) {
    let max = 0, ind = 0;
    for (var i = 0; i < 8; i++) {
        var mountainH = parseInt(readline()); // represents the height of one mountain.
        if (max < mountainH)
        {
            ind = i;
            max = mountainH;
        }
        printErr(mountainH);
    }

    printErr(ind);

    // Write an action using print()
    // To debug: printErr('Debug messages...');

    print(ind); // The index of the mountain to fire on.
}
