export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('studioLogo', 'assets/transparentDuchessChad.png');
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        this.cameras.main.setBackgroundColor('#000000');

        const bigTriangleWidth = w * 0.48;
        const bigTriangleHeight = h * 0.85;
        const bigTriangle = this.add.triangle(     
            w / 2,
            h,
            0, bigTriangleHeight,
            bigTriangleWidth, bigTriangleHeight,
            bigTriangleWidth / 2, 0,
            0xffffff
        );

        const smallTriangleWidth = w * 0.3;
        const smallTriangleHeight = h * 0.5;
        const smallTriangle = this.add.triangle(
            w / 2,
            -200,
            0, 0,
            smallTriangleWidth, 0,
            smallTriangleWidth / 2, smallTriangleHeight,
            0x690000
        );

        const logo = this.add.image(w / 2, h / 2 - 70, 'studioLogo')
            .setAlpha(0)
            .setScale(0.5);

        const studioText = this.add.text(w / 2, h / 2 + 270, 'Mog Studios', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#690000',
            fontStyle: 'bold'
        })
            .setOrigin(0.5)
            .setAlpha(0);

        this.tweens.add({
            targets: bigTriangle,
            y: h / 2 + 15,
            duration: 1000,
            ease: 'Sine.easeOut',
            onComplete: () => {
                this.tweens.add({
                    targets: smallTriangle,
                    y: h / 2 + 25,
                    duration: 1900,
                    ease: 'Sine.easeOut',
                    onComplete: () => {
                        this.tweens.add({
                            targets: [logo, studioText],
                            alpha: 1,
                            duration: 1400,
                            ease: 'Sine.easeInOut',
                            onComplete: () => {
                                this.time.delayedCall(2500, () => {
                                    this.cameras.main.fadeOut(1000, 0, 0, 0);

                                    this.cameras.main.once('camerafadeoutcomplete', () => {
                                        this.scene.start('IntroScene');
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}