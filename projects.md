---
layout: landing
title: The Science
permalink: /projects/
image: Assets/scan2mesh.jpg
description: A brief look into my ongoing tech projects
---

<section id="one">
<div class="inner">

<header class="major">
<h2>Kinect Project</h2>
</header>

<h3>A Summary</h3>

<p>The goal of this project is to take a 3D head scan captured with an original Xbox 360 Kinect sensor and fuse it onto a 3D-printable action figure body, combining computer vision, mesh processing, and a lot of hands-on debugging into one pipeline. Using Microsoft's KinectFusion algorithm, the Kinect's depth camera builds up a 3D model of a person's head as the sensor moves around them frame by frame; from there, a custom Python pipeline (built on Open3D) cleans up the raw scan, closes the gaps a single scanning pass leaves behind, and fuses the head onto a body model to produce a print-ready file.</p>

<h3>The Process So Far</h3>

<p>The first goal was to create a usable work environment to allow for a clean, complete head scan with minimal background static using Kinect Fusion Explorer. The first attempt produced a head scan that was missing a large portion — nearly 50% — of the back of the subject's head. Adjustments to lighting, including minimizing natural light and using two standing LED lights, reduced the missing gap to about 30%.</p>

<p>The next goal was to create a simple body to test the fit of the head scan onto. Body models were built as placeholders, fusing the head onto the body as one solid piece rather than building a swappable joint. The first attempt left the base sitting off the print bed and an arm floating disconnected from the body.</p>

<h3>Next Steps</h3>

<p>The next step is to continue refining the capture setup to close the remaining gap even further, adjusting the sensor's movement speed and depth range to keep tracking from failing mid-scan. Once a scan comes back with a small enough opening, it will run through a cleanup and reconstruction process that isolates the head from any background noise and rebuilds it into a proper 3D surface, followed by a hole-filling step that closes whatever gap remains with texture matched to the subject's own hair rather than a generic patch. From there, the completed head model will be fused onto a body model to produce a final print-ready figure.</p>

</div>
</section>

<section id="two" class="spotlights">
<div class="inner">

<header class="major">
<h2>See the Process for Yourself</h2>
</header>

<section>
<a class="image"><img src="{{ site.baseurl }}/Assets/scan1.jpg" alt="An incomplete head scan of a person's face and the sides of their head" /></a>
<div class="content">
<div class="inner">
<header class="major">
<h3>The first scan</h3>
</header>
<p>A large gap at the back of the head.</p>
</div>
</div>
</section>

<section>
<a class="image"><img src="{{ site.baseurl }}/Assets/scan1mesh.jpg" alt="The first attempt at a mesh file using head scan 1" /></a>
<div class="content">
<div class="inner">
<header class="major">
<h3>The mesh from scan one</h3>
</header>
<p>The raw mesh before cleanup.</p>
</div>
</div>
</section>

<section>
<a class="image"><img src="{{ site.baseurl }}/Assets/worstmodel.jpg" alt="The model with the head and arm misplaced" /></a>
<div class="content">
<div class="inner">
<header class="major">
<h3>The misplaced-head-and-arm attempt</h3>
</header>
<p>The first fusion left the base off the print bed and an arm floating disconnected.</p>
</div>
</div>
</section>

<section>
<a class="image"><img src="{{ site.baseurl }}/Assets/problemattempt.jpg" alt="A refined version of the head fused onto the body model" /></a>
<div class="content">
<div class="inner">
<header class="major">
<h3>A refined fusion</h3>
</header>
<p>The head fused onto the body model.</p>
</div>
</div>
</section>

<section>
<a class="image"><img src="{{ site.baseurl }}/Assets/scan2.jpg" alt="The second, better attempt at the head scan" /></a>
<div class="content">
<div class="inner">
<header class="major">
<h3>Scan two</h3>
</header>
<p>Much less missing after lighting adjustments.</p>
</div>
</div>
</section>

<section>
<a class="image"><img src="{{ site.baseurl }}/Assets/scan2mesh.jpg" alt="The mesh file that came from the second head scan attempt" /></a>
<div class="content">
<div class="inner">
<header class="major">
<h3>The second mesh</h3>
</header>
<p>Ready for cleanup and reconstruction.</p>
</div>
</div>
</section>

</div>
</section>
