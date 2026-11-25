 roadSegments.forEach(segment => {

    segment.position.z += speed;

    // Always put the segment far ahead
    // when it passes behind the camera
    if (segment.position.z > 35) {
        segment.position.z -= 600;
    }
});
scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// Make the sky independent of the road/scenery
scene.fog = new THREE.Fog(
    0x87CEEB,
    80,
    500
);
const groundGeometry = new THREE.PlaneGeometry(
    1000,
    2000
);

const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x2f7037
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.35;
ground.position.z = -500;

ground.receiveShadow = true;

scene.add(ground);
for(let i = 0; i < 30; i++) {

    createRoadSegment(
        -i * 50
    );
}
segment.position.z -= 1500;
scenery.forEach(tree => {

    tree.position.z += speed;

    if (tree.position.z > 40) {

        tree.position.z -= 1500;

        const side =
            Math.random() > 0.5 ? 1 : -1;

        tree.position.x =
            side * (9 + Math.random() * 10);
    }
});
scene.background = new THREE.Color(0x87CEEB);

const skyLight = new THREE.HemisphereLight(
    0x87CEEB,
    0x31552a,
    2.5
);

scene.add(skyLight);

const permanentGround = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 3000),
    new THREE.MeshStandardMaterial({
        color: 0x347a35
    })
);

permanentGround.rotation.x = -Math.PI / 2;
permanentGround.position.set(0, -0.4, -1000);
permanentGround.receiveShadow = true;

scene.add(permanentGround);
/* =========================================================
   ORIGINAL RACING BEAT
========================================================= */

let audioCtx = null;
let musicPlaying = false;
let musicTimer = null;

const musicButton =
    document.getElementById("musicButton");


function createAudio() {

    if (!audioCtx) {
        audioCtx =
            new (window.AudioContext ||
            window.webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
}


/*
   Create one electronic drum sound.
*/
function drum(
    frequency,
    duration,
    volume,
    type = "sine"
) {

    const oscillator =
        audioCtx.createOscillator();

    const gain =
        audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.value =
        frequency;

    gain.gain.setValueAtTime(
        volume,
        audioCtx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start();

    oscillator.stop(
        audioCtx.currentTime +
        duration
    );
}


/*
   Generate an original racing beat.
*/
function startMusic() {

    createAudio();

    if (musicPlaying)
        return;

    musicPlaying = true;

    musicButton.textContent =
        "🔊 MUSIC: ON";

    let beat = 0;

    function loop() {

        if (!musicPlaying)
            return;

        /*
          128 BPM
          = fast racing-game tempo
        */

        const bpm = 128;
        const beatLength =
            60 / bpm;

        /*
          Kick drum
        */

        if (
            beat % 4 === 0 ||
            beat % 4 === 2
        ) {

            drum(
                70,
                .18,
                .65,
                "sine"
            );
        }


        /*
          Hi-hat
        */

        drum(
            5000,
            .045,
            .09,
            "square"
        );


        /*
          Snare
        */

        if (
            beat % 4 === 1 ||
            beat % 4 === 3
        ) {

            drum(
                180,
                .12,
                .25,
                "triangle"
            );

            drum(
                900,
                .05,
                .12,
                "square"
            );
        }


        /*
          Racing synth pulse
        */

        if (beat % 2 === 0) {

            drum(
                220,
                .12,
                .08,
                "sawtooth"
            );
        }


        beat++;

        musicTimer =
            setTimeout(
                loop,
                beatLength * 1000
            );
    }

    loop();
}


function stopMusic() {

    musicPlaying = false;

    musicButton.textContent =
        "🔇 MUSIC: OFF";

    if (musicTimer) {

        clearTimeout(
            musicTimer
        );

        musicTimer = null;
    }
}


musicButton.onclick = () => {

    if (musicPlaying) {
        stopMusic();
    } else {
        startMusic();
    }
};


/*
   Start music when the player
   starts the game.
*/

const oldStartGame =
    startGame;

startGame = function() {

    oldStartGame();

    startMusic();
};
const bpm =
    128 +
    Math.min(
        35,
        distance / 20
    );