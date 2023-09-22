<?php

declare(strict_types=1);

namespace org\wplake\acf_views\AcfCard;

use org\wplake\acf_views\AcfGroups\AcfCardData;
use org\wplake\acf_views\Twig;

defined('ABSPATH') || exit;

class AcfCardFactory
{
    protected QueryBuilder $queryBuilder;
    protected CardMarkup $cardMarkup;
    protected Twig $twig;
    /**
     * @var AcfCardData[]
     */
    protected array $renderedCards;

    public function __construct(QueryBuilder $queryBuilder, CardMarkup $cardMarkup, Twig $twig)
    {
        $this->queryBuilder = $queryBuilder;
        $this->cardMarkup = $cardMarkup;
        $this->twig = $twig;
        $this->renderedCards = [];
    }

    protected function getAcfCard(AcfCardData $acfCardData): AcfCard
    {
        return new AcfCard($acfCardData, $this->queryBuilder, $this->cardMarkup, $this->twig);
    }

    protected function markCardAsRendered(AcfCardData $acfCardData): void
    {
        $this->renderedCards[$acfCardData->getSource()] = $acfCardData;
    }

    public function createAndGetHtml(
        AcfCardData $acfCardData,
        int $pageNumber,
        bool $isMinifyMarkup = true,
        bool $isLoadMore = false
    ): string {
        $acfCard = $this->getAcfCard($acfCardData);
        $acfCard->queryPostsAndInsertData($pageNumber, $isMinifyMarkup, $isLoadMore);

        $cardData = $acfCard->getCardData();

        $this->markCardAsRendered($cardData);

        return $acfCard->getHTML();
    }

    /**
     * @return AcfCardData[]
     */
    public function getRenderedCards(): array
    {
        return $this->renderedCards;
    }
}
