"use strict";

var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
var canvas = render.domElement;
document.body.appendChild(canvas);

var controles = new THREE.OrbitControls(camera, render.domElement);

function gerarCilindroLinhas(raio = 1, altura = 2, pRaio = 8) {
  var pontos = [];
  for (var a = 0; a <= Math.PI * 2; a += (Math.PI * 2) / pRaio) {
    var x = Math.sin(a) * raio;
    var z = Math.cos(a) * raio;
    pontos.push(new THREE.Vector3(x, -altura / 2, z));
    pontos.push(new THREE.Vector3(x, altura / 2, z));
  }

  return new THREE.BufferGeometry().setFromPoints(pontos);
}

// var forma = new THREE.LineSegment(
//   gerarCilindroLinhas(1, 2, 360),
//   new THREE.LineBasicMaterial({ color: 0xffffff })
// );

function gerarQuadro(larg = 1, alt = 1) {
  var pontos = [];
  pontos.push(new THREE.Vector3(-larg / 2, alt / 2));
  pontos.push(new THREE.Vector3(-larg / 2, -alt / 2));
  pontos.push(new THREE.Vector3(larg / 2, alt / 2));

  pontos.push(new THREE.Vector3(larg / 2, alt / 2));
  pontos.push(new THREE.Vector3(-larg / 2, -alt / 2));
  pontos.push(new THREE.Vector3(larg / 2, -alt / 2));

  return new THREE.BufferGeometry().setFromPoints(pontos);
}

// var forma = new THREE.Mesh(
//   gerarQuadro(2, 2),
//   new THREE.LineBasicMaterial({ color: 0xffffff })
// );

function gerarCilindro(r = 1, alt = 1, pRaio = 4) {
  var pontos = [];
  for (var a = 0; a <= Math.PI * 2; a += (Math.PI * 2) / pRaio) {
    var x = Math.sin(a) * r;
    var x2 = Math.sin(a + ((Math.PI * 2) / pRaio) * r);

    var z = Math.cos(a) * r;
    var z2 = Math.cos(a + (Math.PI * 2) / pRaio) * r;

    pontos.push(new THREE.Vector3(x, -alt / 2, z));
    pontos.push(new THREE.Vector3(x2, alt / 2, z2));

    pontos.push(new THREE.Vector3(x, alt / 2, z));
    pontos.push(new THREE.Vector3(x2, -alt / 2, z));

    pontos.push(new THREE.Vector3(x2, -alt / 2, z2));
    pontos.push(new THREE.Vector3(x2, alt / 2, z2));
  }

  return new THREE.BufferGeometry().setFromPoints(pontos);
}

var forma = new THREE.Mesh(
  gerarCilindro(1, 2, 8),
  new THREE.LineBasicMaterial({ color: 0xffffff })
);

forma.material.wireframe = true;

cena.add(forma);

camera.position.z = 20;

function desenhar() {
  render.render(cena, camera);
}

requestAnimationFrame(desenhar);
