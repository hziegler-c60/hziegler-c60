/* Whimsical extras: star chart, sparkles, tarot flips, wax seal,
   Schnitzel easter eggs, fortune, revelry, typewriter. No emojis. */
(function () {
    var COLORS = ['#d4af6a', '#8fb0d9', '#e8d9b0', '#7fb5a8', '#f2e8d5'];

    function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    /* ---- Sparkle cursor trail: CSS-drawn diamond motes, no glyphs ---- */
    if (window.matchMedia('(pointer: fine)').matches) {
        var last = 0;
        document.addEventListener('mousemove', function (e) {
            var now = Date.now();
            if (now - last < 45) return;
            last = now;
            spawnMote(e.clientX, e.clientY, false);
        });
    }

    function spawnMote(x, y, big) {
        var s = document.createElement('span');
        s.className = 'mote';
        s.style.left = x + 'px';
        s.style.top = y + 'px';
        s.style.background = rand(COLORS);
        s.style.boxShadow = '0 0 8px 2px ' + s.style.background;
        var size = big ? (6 + Math.random() * 10) : (3 + Math.random() * 4);
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        if (big) {
            s.style.setProperty('--dx', (Math.random() * 180 - 90) + 'px');
            s.style.animationName = 'mote-burst';
        }
        document.body.appendChild(s);
        setTimeout(function () { s.remove(); }, 1100);
    }

    /* ---- Mote burst wherever you click empty space ---- */
    document.addEventListener('click', function (e) {
        if (e.target.closest('a, button, input, textarea, .link, .wax-seal')) return;
        for (var i = 0; i < 8; i++) spawnMote(e.clientX, e.clientY, true);
    });

    /* ---- Star chart: twinkling stars that link around the cursor ---- */
    function initStarChart() {
        var canvas = document.getElementById('star-chart');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var stars = [];
        var mouse = { x: -9999, y: -9999 };
        var banner = canvas.parentElement;

        function resize() {
            canvas.width = banner.offsetWidth;
            canvas.height = banner.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        for (var i = 0; i < 70; i++) {
            stars.push({
                x: Math.random(), y: Math.random(),
                r: 0.6 + Math.random() * 1.6,
                tw: Math.random() * Math.PI * 2,
                ts: 0.008 + Math.random() * 0.02
            });
        }

        banner.addEventListener('mousemove', function (e) {
            var rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        banner.addEventListener('mouseleave', function () {
            mouse.x = -9999; mouse.y = -9999;
        });

        function frame() {
            var W = canvas.width, H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            var pts = stars.map(function (s) {
                s.tw += s.ts;
                return {
                    x: s.x * W, y: s.y * H,
                    a: 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(s.tw)),
                    r: s.r
                };
            });
            ctx.strokeStyle = 'rgba(212, 175, 106, 0.14)';
            ctx.lineWidth = 0.6;
            for (var i = 0; i < pts.length; i++) {
                for (var j = i + 1; j < pts.length; j++) {
                    var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                    if (dx * dx + dy * dy < 110 * 110) {
                        ctx.beginPath();
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.stroke();
                    }
                }
                var mdx = pts[i].x - mouse.x, mdy = pts[i].y - mouse.y;
                var md2 = mdx * mdx + mdy * mdy;
                if (md2 < 160 * 160) {
                    var strength = 1 - Math.sqrt(md2) / 160;
                    ctx.strokeStyle = 'rgba(212, 175, 106, ' + (0.55 * strength) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                    pts[i].a = Math.min(1, pts[i].a + strength * 0.6);
                }
            }
            ctx.strokeStyle = 'rgba(212, 175, 106, 0.14)';
            for (var k = 0; k < pts.length; k++) {
                ctx.fillStyle = 'rgba(242, 232, 213, ' + pts[k].a + ')';
                ctx.beginPath();
                ctx.arc(pts[k].x, pts[k].y, pts[k].r, 0, Math.PI * 2);
                ctx.fill();
            }
            requestAnimationFrame(frame);
        }
        frame();
    }

    /* ---- Lantern glow: a pool of candlelight follows the cursor ---- */
    function initLantern() {
        var veil = document.getElementById('lantern-veil');
        if (!veil) return;
        var banner = veil.parentElement;
        var target = { x: 0.5, y: 0.55 };
        var glow = { x: 0.5, y: 0.55 };

        banner.addEventListener('mousemove', function (e) {
            var rect = banner.getBoundingClientRect();
            target.x = (e.clientX - rect.left) / rect.width;
            target.y = (e.clientY - rect.top) / rect.height;
        });
        banner.addEventListener('mouseleave', function () {
            target.x = 0.5; target.y = 0.55;
        });

        function frame(t) {
            // ease toward the cursor + gentle candle flicker
            glow.x += (target.x - glow.x) * 0.07;
            glow.y += (target.y - glow.y) * 0.07;
            var flicker = 1 + Math.sin(t / 90) * 0.012 + Math.sin(t / 41) * 0.008;
            var r = 30 * flicker;
            veil.style.background =
                'radial-gradient(circle ' + r + 'vmax at ' +
                (glow.x * 100) + '% ' + (glow.y * 100) + '%, ' +
                'rgba(22, 36, 29, 0) 0%, rgba(22, 36, 29, 0.12) 45%, rgba(12, 19, 15, 0.6) 100%)';
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    /* ---- Meow (synthesized) when you poke Schnitzel ---- */
    var audioCtx = null;
    function meow() {
        try {
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            var t = audioCtx.currentTime;
            var osc = audioCtx.createOscillator();
            var gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(600, t);
            osc.frequency.linearRampToValueAtTime(900, t + 0.15);
            osc.frequency.linearRampToValueAtTime(400, t + 0.45);
            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.exponentialRampToValueAtTime(0.15, t + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
            var filter = audioCtx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 800;
            filter.Q.value = 2;
            osc.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
            osc.start(t); osc.stop(t + 0.5);
        } catch (err) { /* no audio, no problem */ }
    }

    /* ---- Konami code → Schnitzel parade ---- */
    var KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var pos = 0;
    document.addEventListener('keydown', function (e) {
        pos = (e.keyCode === KONAMI[pos]) ? pos + 1 : (e.keyCode === KONAMI[0] ? 1 : 0);
        if (pos === KONAMI.length) {
            pos = 0;
            schnitzelParade();
        }
    });

    function schnitzelParade() {
        for (var i = 0; i < 5; i++) {
            (function (i) {
                var img = document.createElement('img');
                img.src = window.BASEURL + 'Assets/cat-2.jpg';
                img.className = 'schnitzel-parade';
                img.style.top = (8 + Math.random() * 70) + 'vh';
                img.style.animationDelay = (i * 0.4) + 's';
                document.body.appendChild(img);
                setTimeout(function () { img.remove(); }, 5200 + i * 400);
            })(i);
        }
        meow();
        setTimeout(meow, 700);
    }

    /* ---- Revelry (party) mode ---- */
    function toggleParty() {
        document.body.classList.toggle('party-mode');
        var on = document.body.classList.contains('party-mode');
        var btn = document.getElementById('party-btn');
        if (btn) btn.textContent = on ? 'Enough revelry' : 'Revelry';
        if (on) schnitzelParade();
    }

    /* ---- Wax seal over the contact details ---- */
    function breakSeal(e) {
        var seal = e.currentTarget;
        var veil = seal.closest('.wax-veil');
        if (!veil || veil.classList.contains('broken')) return;
        veil.classList.add('broken');
        var split = veil.closest('.split');
        if (split) {
            split.classList.remove('sealed');
            var content = split.querySelector('.sealed-content');
            if (content) {
                content.removeAttribute('aria-hidden');
                content.querySelectorAll('a').forEach(function (a) {
                    a.removeAttribute('tabindex');
                });
            }
        }
        var rect = seal.getBoundingClientRect();
        for (var i = 0; i < 14; i++) {
            spawnMote(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
        }
        setTimeout(function () { veil.remove(); }, 1400);
    }

    /* ---- Typewriter tagline in the banner ---- */
    var TAGLINES = [
        'Bridging creative thinking and operational precision',
        'Rebuilt a library. Co-founded a kitchen. Scanned some heads.',
        'Powered by coffee, poetry, and one judgmental cat.',
        'Ask me about Dewey decimals or 3D meshes.',
        'Librarian hands, developer tools, poet heart.',
        'Cataloger of collections, tamer of spreadsheets.'
    ];

    /* ---- Fortune lines from Hannah's poems ---- */
    var FORTUNES = [
        '“Against all the evil that hell can conjure…”',
        '“...Rip and tear…”',
        'Derelict halls oozing with flesh, festering behind iron bars.',
        'The flesh has warped into red blobs, the demons: flashes of a deeper hue.',
        'I let myself blink for a few extra seconds.',
        'I close my eyes and say no because “...Until it is done.”',
        'I know they can make it this time.',
        'Suddenly I was in a grand ballroom, and I was dancing with a prince.',
        'The gowns blurred together as the music grew louder, and the dancing quickened.',
        'Perhaps my voice, as out-of-tune as a guitar of rubber bands…',
        'Perhaps my cat Schnitzel, who hobbles around with the appearance of a permanent wedgie, is not a royal heir to the throne.',
        'But I sang and danced anyway.',
        'The woods, to an outsider, all look the same.',
        'Pieced together with rusty nails that might have come from the Bronze Age.',
        'A well-worn recliner stood out as the centerpiece of the glorified tree fort.',
        'He keeps inventing anyway, perhaps to increase his odds, or maybe just to entertain the zealous mind of an old man.',
        'In search of the ostensible frog hats.',
        'The acorn berets quickly became a mound.',
        'A line of frogs standing behind the wagon, waiting their turn to collect their trendy new hats.',
        'Whenever I see an acorn laying around, I hope there’s a frog about to find a new hat not far behind.'
    ];

    document.addEventListener('DOMContentLoaded', function () {
        initLantern();
        initStarChart();

        var btn = document.getElementById('fortune-btn');
        var out = document.getElementById('fortune-line');
        if (btn && out) {
            var lastIdx = -1;
            btn.addEventListener('click', function () {
                var i;
                do { i = Math.floor(Math.random() * FORTUNES.length); } while (i === lastIdx);
                lastIdx = i;
                out.textContent = FORTUNES[i];
                out.classList.remove('fortune-pop');
                void out.offsetWidth;
                out.classList.add('fortune-pop');
            });
        }

        var partyBtn = document.getElementById('party-btn');
        if (partyBtn) partyBtn.addEventListener('click', toggleParty);

        document.querySelectorAll('.wax-seal').forEach(function (el) {
            el.addEventListener('click', breakSeal);
        });

        document.querySelectorAll('.schnitzel-poke').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                meow();
                var r = el.getBoundingClientRect();
                for (var i = 0; i < 6; i++) {
                    spawnMote(r.left + r.width / 2, r.top + r.height / 2, true);
                }
                var cat = document.querySelector('.vault-content img');
                if (cat) {
                    cat.classList.remove('cat-blink');
                    void cat.offsetWidth;
                    cat.classList.add('cat-blink');
                }
            });
        });

        var tag = document.getElementById('typewriter');
        if (tag) {
            var idx = 0;
            var cycle = function () {
                var text = TAGLINES[idx % TAGLINES.length];
                idx++;
                tag.textContent = '';
                var c = 0;
                var tick = setInterval(function () {
                    tag.textContent = text.slice(0, ++c);
                    if (c >= text.length) {
                        clearInterval(tick);
                        setTimeout(cycle, 3200);
                    }
                }, 40);
            };
            cycle();
        }
    });
})();
