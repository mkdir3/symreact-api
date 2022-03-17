<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;
    private $auth;

    public function __construct(Security $security, AuthorizationCheckerInterface $checker)
    {
        $this->security = $security;
        $this->auth = $checker;
    }

    // add custom constraints to requests
    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        // Get current user
        $user = $this->security->getUser();

        if (
            ($resourceClass === Customer::class || $resourceClass === Invoice::class)
            && !$this->auth->isGranted('ROLE_ADMIN')
            && $user instanceof User
        ) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            if ($resourceClass === Customer::class) {
                $queryBuilder->andWhere("$rootAlias.user = :user");
            } elseif ($resourceClass === Invoice::class) {
                $queryBuilder->join("$rootAlias.customer", "c")->andWhere("c.user = :user");
            }

            $queryBuilder->setParameter("user", $user);
        }
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}
