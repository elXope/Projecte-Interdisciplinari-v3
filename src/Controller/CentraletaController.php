<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CentraletaController extends AbstractController
{
    #[Route('/centraleta', name: 'centraleta')]
    public function index(): Response
    {
        return $this->render('centraleta/index.html.twig', []);
    }
}
