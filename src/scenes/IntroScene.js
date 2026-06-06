export class IntroScene extends Phaser.Scene {
    constructor() {
        super('IntroScene');
    }

preload() {
    this.load.audio('introAudio', 'assets/theytookourflasks.mp3');

    this.load.image('flask', 'assets/flask.png');
    this.load.image('eatenFlask', 'assets/eatenFlask.png');

    this.load.video('flaskTheft', 'assets/flaskTheft.mp4');
    this.load.video('uukiAtemyFlask', 'assets/uukiAtemyFlask.mp4');
}

create() {
    console.log('IntroScene started');
    const w = this.scale.width;
    const h = this.scale.height;

    this.cameras.main.setBackgroundColor('#000000');

    this.sound.play('introAudio');

    const flask = this.add.image(w / 2, h / 2, 'flask')
        .setScale(1)
        .setAlpha(1);

    this.tweens.add({
        targets: flask,
        angle: 720,
        scale: 0,
        alpha: 0,
        duration: 4000,
        ease: 'Sine.easeInOut',
        onComplete: () => {
            this.playFlaskTheft();
        }
    });
}

playFlaskTheft() {
    const w = this.scale.width;
    const h = this.scale.height;

    const video = this.add.video(w / 2, h / 2, 'flaskTheft')
        .setAlpha(0);

    video.play(false);

    this.tweens.add({
        targets: video,
        alpha: 1,
        duration: 500,
        onComplete: () => {

            video.once('complete', () => {

                this.tweens.add({
                    targets: video,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        video.destroy();
                        this.playUukiAtemyFlask();
                    }
                });

            });

        }
    });
}

playUukiAtemyFlask() {
    const w = this.scale.width;
    const h = this.scale.height;

    const video = this.add.video(w / 2, h / 2, 'uukiAtemyFlask')
        .setAlpha(0);

    video.play(false);

    this.tweens.add({
        targets: video,
        alpha: 1,
        duration: 500,
        onComplete: () => {

            video.once('complete', () => {

                this.tweens.add({
                    targets: video,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        video.destroy();
                        this.showGrowingImage();
                    }
                });

            });

        }
    });
}

    showGrowingImage() {
        const w = this.scale.width;
        const h = this.scale.height;

        const eatenFlask = this.add.image(w / 2, h / 2, 'eatenFlask')
            .setScale(0.05)
            .setAlpha(1);

        this.tweens.add({
            targets: eatenFlask,
            scale: 3,
            duration: 3500,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.tweens.add({
                    targets: eatenFlask,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        eatenFlask.destroy();
                        this.showTitleMenu();
                    }
                });
            }
        });
    }

        showTitleMenu() {
            const w = this.scale.width;
            const h = this.scale.height;
            const flask = this.add.image(w + 500, h / 2, 'flask')
            .setScale(0.6)

            const title = this.add.text(-500, h * 0.22, 'FLASK\nFINDERS', {
                fontFamily: 'Times New Roman',
                fontSize: '72px',
                color: '#ffffff',
                fontStyle: 'bold',
                align: 'left'
            }).setOrigin(0.5);

            const menuText = this.add.text(-500, h * 0.63, 'Continue\n\nNew Game\n\nOptions\n\nAdditonal Content\n\nControls', {
                fontFamily: 'Times New Roman',
                fontSize: '36px',
                color: '#ffffff',
                align: 'left'
            }).setOrigin(0.5);

            this.tweens.add({
                targets: title,
                x: w * 0.2,
                duration: 1000,
                ease: 'Sine.easeOut',
                onComplete: () => {
                    this.tweens.add({
                        targets: menuText,
                        x: w * 0.25,
                        duration: 1000,
                        ease: 'Sine.easeOut',
                        onComplete: () => {
                            this.tweens.add({
                                targets: flask,
                                x: w * 0.7,
                                duration: 2000,
                                ease: 'Sine.easeOut',
                            });
                        }
                    });

                }
            });
        }
}