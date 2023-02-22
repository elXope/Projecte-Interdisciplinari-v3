<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\{Request, Response, JsonResponse};
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
        $form->handleRequest($request);
        if($form->isSubmitted()){
            $tasca = $form->getData();
            $tasca->setUser($this->getUser());
            $tasca->setFet(false);
            $entityManager = $doctrine->getManager();
            $entityManager->persist($tasca);
            $entityManager->flush();
            return new JsonResponse(["dia" => $tasca->getTimestamp()->format('d'), "mes" => $tasca->getTimestamp()->format('m'), "any" => $tasca->getTimestamp()->format('Y')] , Response::HTTP_OK);
        }

        return $this->render('partials/_principalTascaForm.html.twig', [
            'form' => $form->createView()
        ]);
    }

    #[Route('/centraleta/tasquesDia/{timestamp}', name:'tasquesDia')]
    public function tasquesDia(ManagerRegistry $doctrine, Request $request, $timestamp): JsonResponse
    {
        $repository = $doctrine->getRepository(Tasca::class);
        $tasques = $repository->findByDate($timestamp, $this->getUser());
        $items = [];
        foreach($tasques as $tasca){
            $item = [
                "nom" => $tasca->getNom(),
                "color" => $tasca->getColor(),
                "descripcio" => $tasca->getDescripcio(),
                "fet" => $tasca->isFet()
            ];
            $items[] = $item;
        }
        return new JsonResponse($items, Response::HTTP_OK);
    }
}
