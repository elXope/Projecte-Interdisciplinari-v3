<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\{Request, Response};
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\{User, Tasca};
use App\Form\TascaFormType;
use DateTime;

class CentraletaController extends AbstractController
{
    #[Route('/centraleta', name: 'centraleta')]
    public function index(): Response
    {
        return $this->render('centraleta/index.html.twig', []);
    }

    #[Route('/centraleta/principalTasca', name:'principalTasca')]
    public function principalTasca(ManagerRegistry $doctrine, Request $request): Response
    {
        $tasca = new Tasca();
        $form = $this->createForm(TascaFormType::class, $tasca);
        
        return $this->render('partials/_principalTascaForm.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
